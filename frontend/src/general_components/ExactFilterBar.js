import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState, useMemo } from 'react'
import throttle from "lodash/throttle";

function ExactFilterBar(props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(props.options ?? []);
  const [inputValue, setInputValue] = useState("");
  let loading = options.length === 0 && open;

  let values = [];
  let paramValues = props.value;
  console.log("paramValues");
  console.log(paramValues);
  if (props.options !== undefined) {
    for (let value of paramValues) {
      let option = props.options.find((o) => o.value === value);
      if (option !== undefined) {
        values.push(option);
      }
    }
  } else if (paramValues) {
    values = paramValues;
    console.log("okay we are setting the values here");
  }

  const fetchOptions = useMemo(() =>
      throttle(async () => {
        setOptions([]);
        console.log("HI");

        let response = await axios.get(
          `http://localhost:5000/${props.api_name}/${props.api}?query=` + inputValue
        );
        let data = response.data;
        console.log("still here");
        // if (response.data["status"] !== "success") return;

        let names = new Set();
        data.forEach((field) => {
          names.add(field[props.field]);
        });
        console.log("names");
        console.log(names);
        let ops = [...names].map((name) => {
          let op = { label: name, value: name };
          return op;
        });

        setOpen(ops.length !== 0);
        setOptions(ops);
        console.log(ops);
      }, 200),
    [inputValue]
  );

  useEffect(() => {
    if (inputValue === "") {
      return undefined;
    }

    if (props.options === undefined) {
      console.log("no props.options detected.");
      if (props.api) {
        console.log("detecting an api call!");
        let api_name = props.api_name;
        console.log("api_name");
        console.log(api_name);
        fetchOptions();
      }
    }
  }, [inputValue, props.options]);
  // }, [inputValue, props.options, fetchOptions]);

  return (
    <Autocomplete
      sx={{ flexGrow: 1 }}
      multiple
      open={open}
      loading={loading}
      onOpen={() => {
        if (options.length === 0) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }}
      onClose={(event, reason) => {
        return ["escape", "blur"].includes(reason) ? setOpen(false) : null;
      }}
      options={options}
      value={values}
      isOptionEqualToValue={(option, value) => {
        let optionValue = "";
        if (typeof option === "string") optionValue = option;
        else optionValue = option.value;
        if (typeof value === "string") return optionValue === value;
        else return optionValue === value.value;
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        else return option.label;
      }}
      freeSolo={props.options === undefined}
      autoHighlight
      filterOptions={props.options === undefined ? (x) => x : undefined}
      onInputChange={(event, value) => {
        if (props.options === undefined) {
          setInputValue(value);
        }
      }}
      onChange={(event, value, reason, details) => {
        console.log("i am seeing a new value");
        console.log(value);
        let newValues = [];
        for (let element of value) {
          if (typeof element === "string") newValues.push(element);
          else newValues.push(element.value);
        }

        props.onChange(newValues);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          console.log("hello hello");
          console.log(option);
          let label = "";
          if (typeof option === "string") {
            label = option;
          } else {
            label = option.label;
            console.log('label is ' + label);
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
      renderInput={(params) => {
        console.log("yooo the params are");
        console.log(params);
        console.log(props);
        console.log(props.label);
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
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              ),
            }}
          />
        );
      }}
    />
  );
}

export default ExactFilterBar;