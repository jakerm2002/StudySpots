from database.databases import db, ma
from sqlalchemy import and_, or_, func

def generate_query(model, page, per_page, exact_filters, range_filters, sort_attributes, search_fields, search_query, time_filters = None
):
    base_query = db.session.query(model)
    base_query = add_search_filters(base_query, search_fields, search_query)
    base_query = add_exact_filters(base_query, exact_filters)
    base_query = add_range_filters(base_query, range_filters)
    if time_filters:
        base_query = add_time_filters(base_query, time_filters)
    base_query = add_sort(base_query, sort_attributes)
    base_query = base_query.paginate(page=page, per_page=per_page)
    return base_query


# link any possible exact filters with the arguments passed into them
# ex: stateFilter='TX'   cityFilter='Austin'
# this method will then return a dictionary:
#   {
#   University.state : ['TX'],
#   University.city : ['Austin'],
#   University.zipcode : []
#   }
def get_exact_filters(request_args, exact_filter_fields):
    exact_filters = {}
    for field in exact_filter_fields:
        filter_name = field.name + 'Filter'
        elements = get_filter_elements(request_args, filter_name)

        # if we didn't filter by a field, we don't need to add it to the
        # query. only add filters containing elements.
        if elements:
            exact_filters[field] = elements

    return exact_filters

# return a list containing the inidivudal elements
# passed into the API paramter {fieldName}.
# for example, if we call the API with stateFilter=TX,CA
# then get_filter_elements(request_args, stateFilter) will return ['TX', 'CA']
def get_filter_elements(request_args, filter_name):
    # we will treat every filter parameter like it is a list,
    # meaning we are going to assume we may be recieving multiple parameters,
    # ex: stateFilter=TX,CA

    # check if the filter parameter was actually passed into the request
    if filter_name in request_args:
        elements = request_args[filter_name].split(",")
        return elements
    
    # if we didn't filter by a field, just return an empty list
    return []

# add our exact filters to the query.
def add_exact_filters(existing_query, filters):
    # for each of the fields (state, city, zipcode),
    # filter based on the arguments we have passed in to
    # stateFilter, cityFilter, and zipcodeFilter

    new_query = []
    for field in filters:
        if field.type.python_type is list:
            new_query.append(field.contains(filters[field]))
        else:
            new_query.append(field.in_(filters[field]))
    return existing_query.filter(*new_query)

# sort by id by default if no sortBy parameter is passed
# sort by ascending by default if no ascending attribute is passed
def get_sort_attributes(request_args, sort_filter_fields, model):
    sortBy = request_args.get("sortBy", None)
    # print ('uhhh', request_args.get("ascending"))

    ascInput = request_args.get("ascending", "n/a")
    # if some random string is passed in, default to true
    ascending = False if ascInput == "false" else True
    
    print ('sortby is ', sortBy)
    print ('ascending is ', ascending)
    if sortBy:
        for field in sort_filter_fields:
            if field.name == sortBy: # found the field to sort by
                print('found match')
                if ascending:
                    return field.asc()
                return field.desc()
    return model.id

def add_sort(existing_query, sort_attributes):
    return existing_query.order_by(sort_attributes)



def get_range_param(request_args, param_name):
    if param_name in request_args:
        param = request_args[param_name]
        return param
    return None

# returns a dict where the keys are the columns that are range-filter-eligible
# and the value is a tuple containing the min and max
def get_range_filters(request_args, range_filter_fields):
    range_filters = {}
    for field in range_filter_fields:
        filter_min_name = field.name + 'Min'
        filter_max_name = field.name + 'Max'
        min = get_range_param(request_args, filter_min_name)
        max = get_range_param(request_args, filter_max_name)

        # if we didn't filter by a field, we don't need to add it to the
        # query. only add filters containing elements.
        if min or max:
            range_filters[field] = (min, max)

    return range_filters

# add our range filters to the query.
def add_range_filters(existing_query, filters):
    new_query = []
    for field in filters:
        print('type is', type(field))
        min = filters[field][0]
        max = filters[field][1]
        if min:
            new_query.append(field >= min)
        if max:
            new_query.append(field <= max)
    return existing_query.filter(and_(*new_query))

# returns a dict where the keys are the columns that are time-filter-eligible
# and the value is a 24 hour time string that means a store should be open
# at or before that time on the given day
def get_time_filters(request_args, time_filter_fields):
    time_filters = {}
    for field in time_filter_fields:
        # index 10 of field name contains the day number
        filter_name = 'day' + field.name[10] + 'OpenUntil'
        openUntil = get_range_param(request_args, filter_name)

        # if we didn't filter by a field, we don't need to add it to the
        # query. only add filters containing elements.
        if openUntil:
            time_filters[field] = openUntil

    return time_filters

# add our time filters to the query.
def add_time_filters(existing_query, filters):
    ignore_query = []
    new_query = []
    for field in filters:
        openUntil = filters[field]
        if (openUntil == 'N/A'):
            openUntilInt = -1
        else:
            openUntilInt = int(openUntil)
        
        ignore_query.append(field != '-1')
        ignore_query.append(field != 'N/A')

        if openUntilInt < 1000:
            new_query.append(field < '1000')
            new_query.append(field >= openUntil)
            return existing_query.filter(and_(*ignore_query)).filter(and_(*new_query))

        new_query.append(field < '1000')
        new_query.append(field >= openUntil)
        return existing_query.filter(and_(*ignore_query)).filter(or_(*new_query))

    return existing_query.filter(and_(*new_query))


def add_search_filters(existing_query, fields, val):
    # fields are the searchable columns want this to be done by the backend so the endpoint will pass in this field
    # search_str = "%"
    print ('val is', val)
    def search_for_word_in_columns(s):
        search_args = []
        search_query = "%" + s + "%"
        for field in fields:
            search_args.append(func.lower(field).like(func.lower(search_query)))
        return or_(*search_args)
    return existing_query.filter(and_(*list((search_for_word_in_columns(s) for s in val.split()))))