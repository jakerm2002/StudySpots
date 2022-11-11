import { useSearchParams } from 'react-router-dom';
import { Box, Stack } from "@mui/material";

import ExactFilterBar from "./ExactFilterBar";
import { RangeFilterBar } from './RangeFilterBar';

function FilterContainer(props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const getFilterFieldValue = (field) => {
        let param = searchParams.get(field + "Filter") ?? "";
        let paramValues = param === "" ? [] : param.split(",");
        console.log("getfilterFieldValue");
        console.log(paramValues);
        return paramValues;
    };

    return (
      <>
        <Stack direction="row" gap={2} flexWrap="wrap">
              {props.exactFilters.map((f) => (
                <Box sx={{ flexGrow: 1 }}>
                  <ExactFilterBar
                    api_name={props.api_name}
                    value={getFilterFieldValue(f.field)}
                    key={f.field}
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
          <Stack direction="row" gap={1} flexWrap="wrap">
              {props.rangeFilters.map((f) => (
                <Box sx={{ flexBasis: "300px", flexGrow: 1 }}>
                  <RangeFilterBar
                    value={[
                      parseInt(
                        searchParams.get(f.field + "Min") ?? f.min.toString()
                      ),
                      parseInt(
                        searchParams.get(f.field + "Max") ?? f.max.toString()
                      ),
                    ]}
                    key={f.field}
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
                      console.log("change: " + f.field);
                      let newParams = searchParams;
                      newParams.set(f.field + "Min", value[0].toString());
                      newParams.set(f.field + "Max", value[1].toString());
                      if (value[0] === f.min) {
                        newParams.delete(f.field + "Min");
                      }
                      if (value[1] === f.max) {
                        newParams.delete(f.field + "Max");
                      }
                      newParams.delete("page");
                      setSearchParams(newParams);
                    }}
                  />
                </Box>
              ))}
            </Stack>
            </>
    );
    
}

export default FilterContainer;