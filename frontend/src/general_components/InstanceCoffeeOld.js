import React, { useState, useEffect } from "react";
import { useParams, Link, BrowserRouter as Router, Route } from "react-router-dom";


const InstanceCoffee = () => {
    console.log("SUPPPPP");

    const { businessID } = useParams();
      console.log(businessID);
      const [isLoading, setIsLoading] = useState(true);
      const [data, setData] = useState();
    
      useEffect(() => {
        fetch(`https://api.yelp.com/v3/businesses/${businessID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx'
            }
        })
          .then((res) => res.json())
          .then((response) => {
            setData(response);
            setIsLoading(false);
            //console.log(`https://api.yelp.com/v3/businesses/${businessID}`);
          })
          .catch((error) => console.log(error));
      }, [businessID]);

      
    return (
        <>
          {!isLoading && (
            <>
              <h1>Name: {data.name}</h1>
              <h2>Height: {data.height}</h2>
              <h2>Mass: {data.mass}</h2>
              <h2>Hair Color: {data.hair_color}</h2>
              <h2>Skin Color: {data.skin_color}</h2>
              <h2>Eye Color: {data.eye_color}</h2>
              <h2>Birth Year: {data.birth_year}</h2>
              <h2>Gender: {data.gender}</h2>
              <Link to="/">Back to homepage</Link>
            </>
          )}
        </>
    );
}

export default InstanceCoffee;