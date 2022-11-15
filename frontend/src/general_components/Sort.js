import {
  ArrowUpward as AscendingIcon,
  ArrowDownward as DescendingIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Container,
  MenuItem,
  Typography,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
// import {submitSearch} from '../general_components/SearchBar';
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
    // console.log(sortAscending)
    // let searchParamsString = searchParams.toString();
    // let sortFilter = searchParams.get("sortBy");
    // if (sortFilter !== null) {
    //   setSortOption(
    //     sortOptions.find((o) => o.field === sortFilter) ??
    //       sortOptions[0]
    //   );
    // } else {
    //   setSortOption(sortOptions[0]);
    // }
    let newParams = searchParams;
    newParams.set("sortBy", option);
    setSortAscending("true"); 
    newParams.delete("page");
    setSearchParams(newParams);
  };

//   const submitSearch = (newSearchQuery) => {
//     console.log(searchParams)
//     let newParams = searchParams;
//     if (newSearchQuery.length === 0) {
//         newParams.delete("search")
//     } else {
//         newParams.set("search", newSearchQuery);
//     }
//     newParams.set("page", 1);
//     setSearchParams(newParams);
//     submitSearch(searchQuery);
// };

  const handleSortDirectionChange = (sortAscending) => {
    let newParams = searchParams;
    newParams.set("ascending", sortAscending ? "true" : "false");
    setSortAscending(sortAscending)
    newParams.delete("page");
    setSearchParams(newParams);
  };

	return (
	<Container
	  className="page-container"
	  sx={{
	    display: "flex",
	    flexDirection: "column",
	  }}
	>
    <Tooltip title={sortAscending ? "Ascending" : "Descending"}>
      <IconButton
        onClick={() => handleSortDirectionChange(!sortAscending)}
      >
        {sortAscending && <AscendingIcon />}
        {!sortAscending && <DescendingIcon />}
      </IconButton>
    </Tooltip>

	  <Typography
	    gutterBottom
	    className="modelTitle"
	    variant="h2"
	    sx={{ textAlign: "center" }}
	  >
	    Sort
	  </Typography>
	  <Select
    defaultValue = "Sort By"
		children={sortOptions.map((option) => (
        <MenuItem
          value={option.db_label}
          >
          {option.label}</MenuItem>
      ))}
    // onKeyDown={(event) => {
    //   if (event.key === "Enter") {
    //     submitSearch(searchQuery);
    //   }
    // }}
    onChange={(event) => handleSortChange(event.target.value)}
	  />
	</Container>
	);
};
export default Sorter;
    