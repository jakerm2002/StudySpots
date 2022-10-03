const api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ";
const MapComponent = (locationInfo, name, address, latitude, longitude) => {
    console.log(locationInfo.name);
    console.log(locationInfo.address);
    console.log(locationInfo.latitude);
    console.log(locationInfo.longitude);
    const parsed_name = locationInfo.name.replace('&','');
    console.log(parsed_name);
    console.log(`https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${parsed_name}+${locationInfo.address}`);
    return (
        <iframe
        width="450"
        height="250"
        frameBorder="0" style={{border:0}}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${parsed_name}+${locationInfo.address}`}
        allowFullScreen>
        </iframe>
    )
}

export default MapComponent;