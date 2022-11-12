import { Slider } from "@mui/material";
import { Box, Typography } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";

const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

function RangeFilterBar(props) {
  const [value, setValue] = useState([0, 0]);
  const nonlinear = props.nonlinear ?? false;

  const calculateValue = (value) => {
    return nonlinear ? Math.E ** value : value;
  };
  const calculateSliderValue = useCallback(
    (value) => {
      return nonlinear ? Math.log(value) : value;
    },
    [nonlinear]
  );

  let autoMarks = [];
  if (props.autoMark === true && props.marks === undefined) {
    for (let i = props.min; i <= props.max; i += props.step ?? 1) {
      autoMarks.push({
        label: i.toString(),
        value: i,
      });
    }
  }

  let scaledMarks = [];
  for (let mark of props.marks ?? autoMarks) {
    let scaledMark = {
      label: mark.label,
      value: calculateSliderValue(mark.value),
    };
    scaledMarks.push(scaledMark);
  }

  useEffect(() => {
    let min= props.min;
    let queryMin = props.value[0].toString();
    if (queryMin != null && queryMin.length !== 0) {
      min = parseInt(queryMin);
    }
    let max= props.max;
    let queryMax = props.value[1].toString();
    if (queryMax != null && queryMax.length !== 0) {
      max = parseInt(queryMax);
    }
    setValue([calculateSliderValue(min), calculateSliderValue(max)]);
  }, [props.value, calculateSliderValue, props.field, props.max, props.min]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const getLabel = (value) => {
    if (props.compactNumbers ?? false) {
      return numberFormatter.format(value);
    } else {
      return value.toString();
    }
  };

  const handleCommittedChange = (newValue) => {
    let min = Math.round(calculateValue(newValue[0]));
    let max = Math.round(calculateValue(newValue[1]));
    props.onChange([min, max]);
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        {props.label}
      </Typography>
      <Box sx={{ marginTop: "8px", marginLeft: "24px", marginRight: "24px" }}>
        <Slider
          marks={scaledMarks}
          color="primary"
          step={props.step !== undefined ? props.step : nonlinear ? 0.01 : null}
          valueLabelDisplay="auto"
          value={value}
          min={calculateSliderValue(props.min)}
          max={calculateSliderValue(props.max)}
          valueLabelFormat={(value) => getLabel(value)}
          scale={calculateValue}
          onChangeCommitted={(event, newValue) =>
            handleCommittedChange(newValue)
          }
          onChange={(event, newValue) => handleChange(newValue)}
        />
      </Box>
    </Box>
  );
}

export { RangeFilterBar };
