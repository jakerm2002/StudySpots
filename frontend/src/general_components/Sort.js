import {
  ArrowUpward as AscendingIcon,
  ArrowDownward as DescendingIcon,
} from "@mui/icons-material";
import {
  IconButton,
  Container,
  MenuItem,
  Typography,
  Select,
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
	<Container
	  className="page-container"
	  sx={{
	    display: "flex",
	    flexDirection: "column",
	  }}
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

	  <Typography
	    gutterBottom
	    className="text"
	    variant="h2"
	    sx={{ textAlign: "center" }}
	  >
	    Sort
	  </Typography>
	  <Select
    className="text border"
    defaultValue = "Sort By"
		children={sortOptions.map((option) => (
        <MenuItem
          value={option.db_label}
          >
          {option.label}</MenuItem>
      ))}
    onChange={(event) => handleSortChange(event.target.value)}
	  />
	</Container>
	);
};
export default Sorter;
    