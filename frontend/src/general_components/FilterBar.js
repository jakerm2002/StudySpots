import ExactFilterBar from "./ExactFilterBar";

function FilterBar(props) {
    const [searchParams, setSearchParams] = useSearchParams();

    // let exactFilters = props.exactFilters;
    // let rangeFilters = props.rangeFilters;

    const getFilterFieldValue = (field) => {
        let param = searchParams.get(field) ?? "";
        let paramValues = param === "" ? [] : param.split(",");
        console.log("getfilterFieldValue");
        console.log(paramValues);
        return paramValues;
    };

    return (
        <Stack direction="row" gap={2} flexWrap="wrap">
              {props.exactFilters.map((f) => (
                <Box sx={{ flexGrow: 1 }}>
                  <ExactFilterBar
                    value={getFilterFieldValue(f.field)}
                    key={f.field}
                    label={f.label}
                    field={f.field}
                    options={f.options}
                    onChange={(value) => {
                      let newParams = searchParams;
                      if (value.length === 0) {
                        newParams.delete(f.field + "Filter");
                      } else {
                        newParams.set(f.field + "Filter", value.join(","));
                      }
                      newParams.delete("page");
                      setSearchParams(newParams);
                    }}
                  />
                </Box>
              ))}
            </Stack>
    );
    
}

export default FilterBar;