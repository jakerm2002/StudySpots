//average coffee shop rating by state
//OR
//distribution of coffee shop ratings


//pick nearby university and get bar chart of coffee shop star ratings


//most reviewed coffee shops per university

//make the nearby api return all coffee shops within 25 miles of LAT and LONG
//with no limit to the number of results

//add autocomplete for university names

import { useEffect, useState, useMemo, Fragment } from "react";
import { Box, Typography, Stack, Autocomplete, TextField, CircularProgress } from '@mui/material';
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { UniversityEndpointName, UniversityDropdown } from '../general_components/UniversityOptions';
import UniversitySelect from "../general_components/UniversitySelect";
import throttle from "lodash/throttle";


// import UniversityDropdown from "../general_components/UniversityDropdown";

const CoffeeShops = () => {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentUniversity, setCurrentUniversity] = useState("");

    useEffect(() => {
        console.log("change to currentUniversity");
        console.log(currentUniversity)
    }, [currentUniversity])

    return <>
        <UniversitySelect setCurrentUniversity={setCurrentUniversity}/>
        
    </>
}

export default CoffeeShops;