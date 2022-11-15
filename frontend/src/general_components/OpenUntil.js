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

    const handleChange = (option) => {
        const d = new Date();
        let day = d.getDay();
        let newParams = searchParams;
        if (option.value !== "")
            newParams.set("day" + day + "OpenUntil", option.value);
        else
            newParams.delete("day" + day + "OpenUntil")
        newParams.delete("page");
        setOptions(option);
        setSearchParams(newParams);
    };

    const optionToLabel = (option) => {
        return option.label
    }

    const labelToOption = (label) => {
        let option = 
            props.options.find((o) => o.label === label) ?? props.options[0];
        return option;
      };
    
    return(
        <>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
        <InputLabel>Open until:</InputLabel>
        <Select
            label="Open until:"
            value={optionToLabel(options)}
            onChange={(event) =>
                // frontend label of the selected dropdown option
                handleChange(labelToOption(event.target.value))
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
                // key={option.value}
                value={option.label}
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