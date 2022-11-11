import { useSearchParams } from 'react-router-dom';
import { Box, Stack } from "@mui/material";

import ExactFilterBar from "./ExactFilterBar";

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
    );
    
}

export default FilterContainer;