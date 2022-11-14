// import {
//   Clear,
//   ArrowUpward as AscendingIcon,
//   ArrowDownward as DescendingIcon,
// } from "@mui/icons-material";
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
  const [sortAscending, setSortAscending] = React.useState(props.sortAscending);
    var sortOptions = props.sortOptions;
  var menuOptions = getMenuOptions(sortOptions);

  const handleSortChange = (option) => {
    console.log("handling change")
    let sortAscending = true
    setSortAscending(sortAscending); // let searchParamsString = searchParams.toString();

    let sortFilter = searchParams.get("sortBy");
    if (sortFilter !== null) {
      setSortOption(
        sortOptions.find((o) => o.field === sortFilter) ??
          sortOptions[0]
      );
    } else {
      setSortOption(sortOptions[0]);
    }
    let newParams = searchParams;
    newParams.set("sortBy", option);
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const submitSearch = (newSearchQuery) => {
    let newParams = searchParams;
    if (newSearchQuery.length === 0) {
        newParams.delete("search")
    } else {
        newParams.set("search", newSearchQuery);
    }
    newParams.set("page", 1);
    setSearchParams(newParams);
    submitSearch(searchQuery);
};

  // const handleSortDirectionChange = (sortAscending) => {
  //   let newParams = searchParams;
  //   newParams.set("ascending", sortAscending ? "true" : "false");
  //   newParams.delete("page");
  //   setSearchParams(newParams);
  // };


  function getMenuOptions (options) {

    menuOptions = []
    for (var i = 0; i < options.length; i++) {
      console.log(options[i])
      menuOptions.push(<MenuItem
        value={options[i].db_label}
        onChange={(event) => 
          handleSortChange(event.target.value)
        }

      >{options[i].label}</MenuItem>)
    }
    return menuOptions;
  };


  let defaultSortOptionIndex = props.defaultSortOptionIndex;

  // useEffect(() => {
  //   // setSearchQuery(searchParams.get("query") ?? "");

    
  //   // setSearchParams(newParams);
  //   // setSearchQuery(searchParams.get("sat_median_math"));
  // }, [searchParams, sortOptions]);

	  
	return (
	<Container
	  className="page-container"
	  sx={{
	    display: "flex",
	    flexDirection: "column",
	  }}
	>
	  <Typography
	    gutterBottom
	    className="modelTitle"
	    variant="h2"
	    sx={{ textAlign: "center" }}
	  >
	    Sort
	  </Typography>
	  <Select
    defaultValue = {sortOptions[0].db_label}
		children={menuOptions}
    onKeyDown={(event) => {
      if (event.key === "Enter") {
        submitSearch(searchQuery);
      }
    }}
    onChange={(event) => handleSortChange(event.target.value)}
	  />
	</Container>
	);
};
export default Sorter;
    