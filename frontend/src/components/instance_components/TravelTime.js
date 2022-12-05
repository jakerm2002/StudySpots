import { useState } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";

const TravelTime = ({instanceLatitude, instanceLongitude}) => {

    const [locationAvailable, setLocationAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [travelTime, setTravelTime] = useState('');

    function getLocation() {
        if ("geolocation" in navigator) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    getTravelTime(position.coords.latitude, position.coords.longitude);
                }
            );
        }
    }

    const getTravelTime = (myLatitude, myLongitude) => {
        axios.post(
            'https://routes.googleapis.com/directions/v2:computeRoutes',
            {
              "origin":{
                "location":{
                  "latLng":{
                    "latitude": myLatitude,
                    "longitude": myLongitude
                  }
                }
              },
              "destination":{
                "location":{
                  "latLng":{
                    "latitude": instanceLatitude,
                    "longitude": instanceLongitude
                  }
                }
              },
              "travelMode": "WALK",
              "computeAlternativeRoutes": false,
              "languageCode": "en-US",
              "units": "IMPERIAL"
            },
            {
              headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': 'AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ',
              'X-Goog-FieldMask' : 'routes.duration'
              }
            }
          ).then(response => {
            //the time is returned from Google Maps in seconds only
            //this converts it from seconds to Minutes and Seconds
            let travelTimeString = response.data.routes[0].duration;
            let travelTimeSeconds = parseInt(travelTimeString.slice(0, -1)); //remove the s from 10s
            let travelTimeMinutes = Math.floor(travelTimeSeconds / 60);
            let travelTimeRemainder = travelTimeSeconds - travelTimeMinutes * 60;
            travelTimeString = travelTimeMinutes + 'm ' + travelTimeRemainder + 's walking'
            setTravelTime(travelTimeString);
            setIsLoading(false);
            setLocationAvailable(true);
          });
    }

    return(
        <div>
            <Button variant="dark" onClick={getLocation}>Get travel time</Button>
            {isLoading && (<div>Calculating, please wait...</div>)}
            {!isLoading && locationAvailable && (<div>{travelTime}</div>)}
        </div>
    );
}

export default TravelTime;