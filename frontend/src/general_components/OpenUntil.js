import {
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box
  } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
  

function OpenUntil(props) {
    
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
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Open until</InputLabel>
        <Select
            id="open-until-field"
            label="Open until"
            value={optionToValue(options)}
            onChange={(event) =>
                handleSortChange(valueToOption(event.target.value))
            }
            inputProps={{
                sx: {
                borderRadius: "8px",
                flexGrow: 1,
                minWidth: "150px",
                display: "flex",
                },
            }}
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