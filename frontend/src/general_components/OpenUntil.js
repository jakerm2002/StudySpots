import {
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box
  } from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
  

function OpenUntil(props) {

    // console.log(props.options);
    // console.log(props.options[0]);
    // console.log(props.options[1].value);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [options, setOptions] = useState(props.options[0]);

    const handleSortChange = (option) => {
        const d = new Date();
        let day = d.getDay();
        let newParams = searchParams;
        newParams.set("hours_day_" + day + "_closed" + "OpenUntil", option.value);
        newParams.delete("page");
        setOptions(option);
        setSearchParams(newParams);
    };


    const optionToValue = (option) => {
        console.log('optionToValue');
        console.log(option.value);
        return option.value;
    };

    const valueToOption = (value) => {
        let option =
          props.options.find((o) => o.value === value) ??
          props.options[0];
        return option;
      };
    
    

      
    return(
        <>
        {/* <Select label="open until">

        </Select> */}
        <Box sx={{ maxWidth: 120 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Open until</InputLabel>
        <Select
            id="open-until-field"
            // select
            label="Open until"
            value={optionToValue(options)}
            onChange={(event) =>
                handleSortChange(valueToOption(event.target.value))
            }
            // inputProps={{
            //     sx: {
            //     borderRadius: "8px",
            //     // backgroundColor: "grey",
            //     flexGrow: 1,
            //     minWidth: "150px",
            //     display: "flex",
            //     },
            // }}
        >
            {props.options.map((option) => (
                <MenuItem
                key={option.value}
                value={option.value}
                >
                {option.label}
                </MenuItem>
            ))}
        </Select>
        </FormControl>
        </Box>
        </>
    )
}

export default OpenUntil;