import { useSearchParams } from 'react-router-dom';
import { Box, Stack } from "@mui/material";

import ExactFilterBar from "./ExactFilterBar";
import { RangeFilterBar } from './RangeFilterBar';

function FilterContainer(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilterFieldValue = (field) => {
    let param = searchParams.get(field + "Filter") ?? "";
    let paramValues = param === "" ? [] : param.split(",");
    return paramValues;
  };

  return (
    <>
      <Stack direction="row" gap={2} flexWrap="wrap" ml="50px" mr="50px" mt="20px" mb="20px">
        {props.exactFilters.map((f) => (
          <Box sx={{ flexGrow: 1 }}>
            <ExactFilterBar
              api_name={props.api_name}
              value={getFilterFieldValue(f.field)}
              label={f.label}
              field={f.field}
              options={f.options}
              api={f.api}
              onChange={(value) => {
                let newParams = searchParams;
                if (value.length === 0) {
                  newParams.delete(f.field + "Filter");
                } else {
                  newParams.set(f.field + "Filter", value.join(","));
                }
                newParams.delete("page");
                setSearchParams(newParams);
              }}
            />
          </Box>
        ))}
      </Stack>
      <Stack direction="row" gap={2} flexWrap="wrap" ml="50px" mr="50px">
        {props.rangeFilters.map((f) => (
          <Box sx={{ flexBasis: "400px", flexGrow: 1 }}>
            <RangeFilterBar
              value={[
                parseInt(searchParams.get(f.field + "Min") ?? f.min.toString()),
                parseInt(searchParams.get(f.field + "Max") ?? f.max.toString()),
              ]}
              label={f.label}
              min={f.min}
              max={f.max}
              step={f.step}
              field={f.field}
              marks={f.marks}
              nonlinear={f.nonlinear}
              autoMark={true}
              compactNumbers={f.compactNumbers}
              onChange={(value) => {
                let searchParamsRange = searchParams;
                searchParamsRange.set(f.field + "Min", value[0].toString());
                searchParamsRange.set(f.field + "Max", value[1].toString());
                if (value[0] === f.min) {
                  searchParamsRange.delete(f.field + "Min");
                }
                if (value[1] === f.max) {
                  searchParamsRange.delete(f.field + "Max");
                }
                searchParamsRange.delete("page");
                setSearchParams(searchParamsRange);
              }}
            />
          </Box>
        ))}
      </Stack>
    </>
  );

}

export default FilterContainer;