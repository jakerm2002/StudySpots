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

    const [searchParams, setSearchParams] = useSearchParams();
    const [options, setOptions] = useState(props.options[0]);

    let day = new Date().getDay();

    // get and display the current filtering value if it is in the URL
    // but not selected using this OpenUntil component
    useEffect(() => {
        let openUntilFilter = searchParams.get("day" + day + "OpenUntil");
        if (openUntilFilter !== null) {
          setOptions(props.options.find((o) => o.value === openUntilFilter) ?? options);
        } else {
          setOptions(options);
        }
      }, [searchParams]);
    

    const handleChange = (option) => {
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
                    <InputLabel className="text">Open until:</InputLabel>
                    <Select
                        className="text"
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
                            }
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