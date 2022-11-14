import axios from 'axios';
import { useState, useEffect } from 'react';

const WeatherString = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light showers",
    81: "Moderate showers",
    82: "Heavy showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm amd hail",
    99: "Thunderstorm and hail"
};

const WeatherWidget = ({latitude, longitude}) => {

    const [weatherData, setWeatherData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`).then(response => {
            setWeatherData(response.data);
            setIsLoading(false);
        });
    }, [])
    
    return(
        <>
            {!isLoading && (<div>{weatherData['current_weather']['temperature']}°F {WeatherString[weatherData['current_weather']['weathercode']]}</div>)}
        </>
    );
}

export default WeatherWidget;