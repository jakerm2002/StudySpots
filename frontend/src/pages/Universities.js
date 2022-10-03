import getInstance from "../general_components/InstanceTemplate";
const Universities = () => {
	var payload = {
		"Image" : "https://s3-media2.fl.yelpcdn.com/bphoto/fjsB0ZkY-lbVdGVMzF3uMQ/o.jpg",
		"Stats" : ["Item", "Item"],
		"Body" : "Lorem"
	}
	return getInstance(payload) 
}

export default Universities;