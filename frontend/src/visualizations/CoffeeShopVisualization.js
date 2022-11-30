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
import throttle from "lodash/throttle";


import AutocompleteDropdown from "../general_components/AutocompleteDropdown";

const CoffeeShops = () => {
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [options, setoptions] = useState([]);
    const [currentUniversity, setCurrentUniversity] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

    useEffect(() => {
        console.log("detecting input value change");
        let active = true;
    
        // if (!loading) {
        //   return undefined;
        // }

        console.log("calling fetchOptions()");
        fetchOptions();
    
        return () => {
          active = false;
        };
      }, [inputValue]);
    
      useEffect(() => {
        if (!open) {
          setoptions([]);
        }
      }, [open]);

    const fetchOptions = useMemo(() =>
        throttle(async () => {
            setoptions([]);

            let response = await axios.get(
                `http://localhost:5000/${UniversityEndpointName}/${UniversityDropdown.api}?query=` + inputValue
            );
            let data = response.data;
            // console.log(data);

            let names = [];
            data.forEach(element => {
                // names.push(element["name"]);
                names.push({"label": element["name"], "latitude": element["latitude"], "longitude": element["longitude"]});

            });
            setoptions(names);

        }, 200),
        [inputValue]
    );

    // useEffect(() => {
    //     if (inputValue === "") {
    //         return undefined;
    //     }


    //     fetchOptions();
    // }, [inputValue]);

    return <>
        <Box className="text" display="flex" alignItems="center" justifyContent="center">
            <Autocomplete
                disablePortal
                // value={inputValue}
                options={options}
                sx={{ width: '50%' }}
                renderInput={(params) => <TextField {...params} label="University" InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}/>}
                
                onChange={(event, value) => {
                    console.log("new change value is ");
                    console.log(value);
                    setCurrentUniversity(value);
                }}
                onInputChange={(event, value) => {
                    console.log("new input value is " + value);
                    setInputValue(value);
                }}
                open = {open}
                onOpen={() => {
                    setOpen(true);
                  }}
                onClose={() => {
                    setOpen(false);
                }}
                filterOptions={(x) => x}
                loading={loading}
                isOptionEqualToValue={(option, value) => option.name === value.name}
            />
        </Box>

    </>
}

export default CoffeeShops;