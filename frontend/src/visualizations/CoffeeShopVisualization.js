//average coffee shop rating by state
//OR
//distribution of coffee shop ratings


//pick nearby university and get bar chart of coffee shop star ratings


//most reviewed coffee shops per university

//make the nearby api return all coffee shops within 25 miles of LAT and LONG
//with no limit to the number of results

//add autocomplete for university names

import { useEffect, useState } from "react";
import { Box, Typography, Stack } from '@mui/material';
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { UniversityEndpointName, UniversityDropdown } from '../general_components/UniversityOptions';


import AutocompleteDropdown from "../general_components/AutocompleteDropdown";

const CoffeeShops = () => {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //     let urls = [];
    //     urls.push("https://api.studyspots.me/universities?per_page=300");

    //     let promises = []
    //     urls.forEach((url) => {
    //         promises.push(axios.get(url));
    //     });

    //     Promise.all(promises).then((results) => {
    //         let temp = [];
    //         results.forEach((response) => {
    //             console.log(response.data["results"]);
    //             let universityList = response.data["results"];
    //             for (let i = 0; i < universityList.length; i++) {
    //                 let university = universityList[i]["name"];
    //                 let average_sat = universityList[i]["sat_average"];
    //                 let acceptance_rate = universityList[i]["acceptance_rate"];
    //                 temp.push({
    //                     "university": university,
    //                     "average_sat": average_sat,
    //                     "acceptance_rate": acceptance_rate,
    //                 })
    //             }
    //         });
    //         setData(temp);
    //     });
    // }, []);

    // const CustomTooltip = ({active, payload }) => {
    //     if (active) {
    //         return (
    //             <Box
    //                 sx={{
    //                     backgroundColor: "white",
    //                     padding: "8px",
    //                     border: "1px solid black",
    //                 }}
    //             >
    //                 <Typography>{payload[0].payload.university}</Typography>
    //                 <Typography>{"Average SAT: " + payload[0].payload.average_sat}</Typography>
    //                 <Typography>{"Acceptance Rate: " + payload[0].payload.acceptance_rate}</Typography>
    //             </Box>
    //         )
    //     }
    // }

    const getFilterFieldValue = (field) => {
        let param = searchParams.get(field + "Filter") ?? "";
        let paramValues = param === "" ? [] : param.split(",");
        return paramValues;
      };

    return <>
        <Box className="text" sx={{ flexGrow: 1 }}>
        <AutocompleteDropdown
            color={"text"}
            api_name={UniversityEndpointName}
            value={getFilterFieldValue(UniversityDropdown.field)}
            label={UniversityDropdown.label}
            InputLabelProps={{className: "textField_Label"}}
            field={UniversityDropdown.field}
            options={UniversityDropdown.options}
            api={UniversityDropdown.api}
            onChange={(value) => {
            let newParams = searchParams;
            // if (value.length === 0) {
            //     newParams.delete(f.field + "Filter");
            // } else {
            //     newParams.set(f.field + "Filter", value.join(","));
            // }
            newParams.delete("page");
            setSearchParams(newParams);
            }}
        />
        </Box>
    </>
}

export default CoffeeShops;