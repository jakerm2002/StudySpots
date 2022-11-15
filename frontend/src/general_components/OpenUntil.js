import {
    MenuItem,
    TextField,
  } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
  

function OpenUntil(props) {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortOption, setSortOption] = React.useState<SortOption>(
        props.options[0]
    );
    const [sortAscending, setSortAscending] = React.useState<boolean>(
        props.sortAscending
    );

    const handleSortChange = (option) => {
        let newParams = searchParams;
        newParams.set(option.field + "OpenUntil", option.field);
        newParams.delete("page");
        setSearchParams(newParams);
    };


    const optionToValue = (option) => {
        return option.field;
    };

    const valueToOption = (value) => {
        let option =
          props.sortOptions.find((o) => o.field === value) ??
          props.sortOptions[props.defaultSortOptionIndex ?? 0];
        return option;
      };
    
    

      
    return(
        <TextField
                id="filter-field"
                select
                label="Sort"
                value={optionToValue(sortOption)}
                onChange={(event) =>
                  handleSortChange(valueToOption(event.target.value))
                }
                InputProps={{
                  sx: {
                    borderRadius: "8px",
                    backgroundColor: "grey",
                    flexGrow: 1,
                    minWidth: "150px",
                    display: "flex",
                  },
                }}
              >
                {props.options.map((option) => (
                  <MenuItem
                    key={optionToValue(option)}
                    value={optionToValue(option)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
        </TextField>
    )
}