const api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ";
const MapComponent = (latitude, longitude) => {
    console.log(latitude);
    return (
        <iframe
        width="450"
        height="250"
        frameBorder="0" style={{border:0}}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${api_key}&PARAMETERS`}
        allowFullScreen>
        </iframe>
    )
}

export default MapComponent;