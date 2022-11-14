// credit to UniverCity for frontend filtering logic
// (https://gitlab.com/coleweinman/swe-college-project)

import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useMemo } from 'react'
import throttle from "lodash/throttle";

function ExactFilterBar(props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(props.options ?? []);
  const [inputValue, setInputValue] = useState("");
  let loading = options.length === 0 && open;

  let values = [];
  let paramValues = props.value;
  if (props.options !== undefined) {
    for (let value of paramValues) {
      let option = props.options.find((o) => o.value === value);
      if (option !== undefined) {
        values.push(option);
      }
    }
  } else if (paramValues) {
    values = paramValues;
  }

  const fetchOptions = useMemo(() =>
    throttle(async () => {
      setOptions([]);

      let response = await axios.get(
        `https://api.studyspots.me/${props.api_name}/${props.api}?query=` + inputValue
      );
      let data = response.data;

      let names = new Set();
      data.forEach((field) => {
        names.add(field[props.field]);
      });

      let ops = [...names].map((name) => {
        let op = { label: name, value: name };
        return op;
      });

      setOpen(ops.length !== 0);
      setOptions(ops);
    }, 200),
    [inputValue]
  );

  useEffect(() => {
    if (inputValue === "") {
      return undefined;
    }
    if (props.options === undefined) {
      if (props.api) {
        // autocomplete using API endpoint
        // ex. api="cities"
        // will go to api/model/cities
        // you can add a query parameter to this call
        // so that it will show you autocomplete suggestions
        fetchOptions();
      }
    }
  }, [inputValue, props.options]);

  return (
    <Autocomplete
      sx={{ flexGrow: 1 }}
      multiple
      autoHighlight
      open={open}
      loading={loading}
      options={options}
      value={values}
      onOpen={() => { setOpen(options.length === 0 ? false : true); }}
      onClose={(event, reason) => {
        return ["escape", "blur"].includes(reason) ? setOpen(false) : null;
      }}
      freeSolo={props.options === undefined} //may suggest similar or previous searches
      getOptionLabel={(option) => {
        return (typeof option === "string") ?
           option : option.label
      }}
      filterOptions={props.options === undefined ? (x) => x : undefined}
      isOptionEqualToValue={(option, value) => {
        let optionValue = "";
        if (typeof option === "string") optionValue = option;
        else optionValue = option.value;
        if (typeof value === "string") return optionValue === value;
        else return optionValue === value.value;
      }}
      onInputChange={(event, value) => {
        if (props.options === undefined) {
          setInputValue(value);
        }
      }}
      onChange={(event, value, reason, details) => {
        let newValues = [];
        for (let element of value) {
          if (typeof element === "string") newValues.push(element);
          else newValues.push(element.value);
        }

        props.onChange(newValues);
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            label={props.label}
            placeholder={props.label}
            InputProps={{
              ...params.InputProps,
              style: { borderRadius: "8px" },
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </>
              ),
            }}
          />
        );
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          let label = "";
          if (typeof option === "string") {
            label = option;
          } else {
            label = option.label;
          }
          return (
            <Chip
              variant="filled"
              color="primary"
              label={label}
              {...getTagProps({ index })}
            />
          );
        })
      }
    />
  );
}

export default ExactFilterBar;