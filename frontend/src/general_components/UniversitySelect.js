import { useEffect, useState, useMemo, Fragment } from "react";
import { Box, Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from "axios";
import { UniversityEndpointName, UniversityDropdown } from './UniversityOptions';
import throttle from "lodash/throttle";

const UniversitySelect = (props) => {

    const [options, setoptions] = useState([]);
    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;

    useEffect(() => {
        console.log("useeffect");
        let active = true;
        if (!loading) {
            return undefined;
        }

        fetchOptions();

        return () => {
            active = false;
        };
    }, [loading]);


    const fetchOptions = useMemo(() =>
        throttle(async () => {
            let response = await axios.get(
                `https://api.studyspots.me/${UniversityEndpointName}/${UniversityDropdown.api}`
            );
            let data = response.data;
            let names = [];
            data.forEach(element => {
                names.push({ "label": element["name"], "latitude": element["latitude"], "longitude": element["longitude"] });

            });
            setoptions(names);

        }, 200),
        []
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