Canvas / Discord group number: 11-4
 
Names of the team members: Jake Medina, Vincent Chen, Ami Iyer, Joanne Chen, Bianca Alvarado
 
Name of the project (alphanumeric, no spaces, max 32 chars, this will also be your URL): studyspots.me
 
URL of the GitLab repo: https://gitlab.com/jakem02/cs373-idb
 
The proposed project: Studyspots.me will be a website for college students to find out places to study that are nearby to their university. It will help college students find new places to check out and discover different places based on varying needs.
 
URLs of at least three disparate data sources that you will programmatically scrape using a RESTful API (be very sure about this):

    Locations for Libraries: https://developers.google.com/maps
    Information about Coffee Shops: https://www.yelp.com/developers/documentation/v3/get_started
    Universities: https://collegescorecard.ed.gov/data/
 
At least three models: Universities, Coffee Shops, Libraries
 
An estimate of the number of instances of each model:

    Universities: ~200-300
    Coffee Shops: ~500-600
    Libraries: ~200-300
 
Describe at least five of those attributes for each model that you could filter by or sort by on the model (grid) pages:

    Universities: state, city, zip code, enrollment, Names (alphabetical), Size of the college, Average Tuition Cost, Year, Public/private/community
    Coffee Shops: Ratings, Location, Business of the place, Name (alphabetical), Number of Reviews, Prices, Hours, Local/Chain
    Libraries: Ratings, Business of the library, Name (alphabetical), Location, Hours
 
Describe at least five additional attributes for each model that you could search for on the instance pages:

	Universities: Phone, Website, Distance to nearest city, Distance from me, Year Founded
	Coffee Shops: Phone, Website, Has wifi, amenities, Distance from me
	Libraries: Phone, Website, Amenities, Distance from me
 
Describe at least two types of media for each model that you could display on the instance pages:

    Universities: location on map, pictures of university, link to website, nearby coffee shops, libraries on/off campus, description of the area
    Coffee Shops: display location on map, ratings, pictures of the coffee shop, business hours, pictures of food/coffee, links to social media or menu    
    Libraries: business hours, pictures of library, ratings, link to website, library description, display location on maps
 
Data Connections:

	Our three models will be linked to each other by proximity.
 
What three questions will you answer due to doing this data synthesis on your site?

    What is the closest library to my university?
    What coffee shop with a 5-star rating is closest to me?
    How many coffee shops are within 3 miles of my university?
