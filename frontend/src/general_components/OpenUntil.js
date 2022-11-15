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

    return (
        <>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel>Open until:</InputLabel>
                    <Select
                        label="Open until:"
                        value={options}
                        onChange={(event) =>
                            // frontend label of the selected dropdown option
                            handleChange(event.target.value)
                        }
                        inputProps={{
                            sx: {
                                flexGrow: 1,
                                minWidth: "120px",
                                display: "flex",
                            },
                        }}
                    >
                        {props.options.map((option) => (
                            <MenuItem value={option}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}

export default OpenUntil;