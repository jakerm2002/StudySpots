import getInstance from "../general_components/InstanceTemplate";
const CoffeeShops = () => {
	var payload = {
		"Image" : "https://i1.wp.com/www.agirlfromtx.com/wp-content/uploads/2019/05/coffee-shops-Austin-flat-track-coffee.jpg?resize=1595%2C1196&ssl=1",
		"Stats" : ["Item 1: ", "Item 2:"],
		"Body" : "Lorem Ipsum or whatever they say"
	}
	return getInstance(payload)
}

export default CoffeeShops;