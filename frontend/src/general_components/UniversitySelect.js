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
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { UniversityEndpointName, UniversityDropdown } from './UniversityOptions';
import throttle from "lodash/throttle";

const UniversitySelect = (props) => {

    const [options, setoptions] = useState([]);
    
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        fetchOptions();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setoptions([]);
        }
    }, [open]);

    const fetchOptions = useMemo(() =>
        throttle(async () => {
            setoptions([]);

            let response = await axios.get(
                `https://api.studyspots.me/${UniversityEndpointName}/${UniversityDropdown.api}?query=` + inputValue
            );
            let data = response.data;
            let names = [];
            data.forEach(element => {
                names.push({ "label": element["name"], "latitude": element["latitude"], "longitude": element["longitude"] });

            });
            setoptions(names);

        }, 200),
        [inputValue]
    );

    return <>
        <Box className="text" display="flex" alignItems="center" justifyContent="center">
            <Autocomplete
                disablePortal
                value={props.currentUniversity ? props.currentUniversity.label : ""}
                options={options}
                sx={{ width: '500px' }}
                renderInput={(params) => <TextField {...params} label="Select university" InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </Fragment>
                    ),
                }} />}

                onChange={(event, value) => {
                    props.setCurrentUniversity(value);
                }}
                onInputChange={(event, value) => {
                    setInputValue(value);
                }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                loading={loading}
                isOptionEqualToValue={(option, value) => option.name === value.name}
            />
        </Box>
        

    </>
}

export default UniversitySelect;