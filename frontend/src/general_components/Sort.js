import {
  ArrowUpward as AscendingIcon,
  ArrowDownward as DescendingIcon,
} from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  InputLabel,
  FormControl,
  Box,
  Stack
} from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";



function Sorter(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortOption, setSortOption] = React.useState(
    props.sortOptions[0]
  )
  const [sortAscending, setSortAscending] = React.useState(
    props.sortAscending
  );

  var sortOptions = props.sortOptions;

  const handleSortChange = (option) => {
    let newParams = searchParams;
    newParams.set("ascending", "true");
    setSortAscending("true");
    newParams.set("sortBy", option);
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const handleSortDirectionChange = (sortAscending) => {
    let newParams = searchParams;
    newParams.set("ascending", sortAscending ? "true" : "false");
    setSortAscending(sortAscending)
    newParams.delete("page");
    setSearchParams(newParams);
  };

  return (
    <>
      <Stack className="text" direction="row" gap={1} flexWrap="wrap" ml="50px" mr="50px" mt="20px" mb="20px" justifyContent="center">
        <Box className="text" sx={{ minWidth: 140 }}>
          <FormControl fullWidth>
            <InputLabel className="text">Sort by</InputLabel>
            <Select
              className="text"
              label="Sort by"
              children={sortOptions.map((option) => (
                <MenuItem
                  value={option.db_label}
                >
                  {option.label}</MenuItem>
              ))}
              onChange={(event) => handleSortChange(event.target.value)}
              inputProps={
                {
                  classes: {
                    notchedOutline: "border",
                  },
                  sx: {
                    flexGrow: 1,
                    maxWidth: "120px",
                    display: "flex",
                  }
                }
              }
            />
          </FormControl>
        </Box>
        <Box
          className="text" sx={{ marginTop: 1, maxwidth: 200 }}
        >
          <Tooltip title={sortAscending ? "Ascending" : "Descending"}>
            <IconButton
              className="text"
              onClick={() => handleSortDirectionChange(!sortAscending)}
            >
              {sortAscending && <AscendingIcon />}
              {!sortAscending && <DescendingIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </>
  );
};
export default Sorter;
