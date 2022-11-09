import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { TextField } from "@mui/material";

const SearchBar = ({searchParams, setSearchParams}) => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    const submitSearch = (newSearchQuery) => {
        // let newParams = searchParams;
        // console.log('submitting saerch');
        // console.log('current searchparams are');
        // console.log(newParams);
        // if (newSearchQuery.length === 0) {
        //     newParams.delete("search")
        // } else {
        //     newParams.set("search", newSearchQuery);
        // }
        setSearchParams({"search" : newSearchQuery});
        console.log('hey this is ' + searchParams.toString());
    };
    const updateSearch = (searchValue) => {
        console.log('update search is ');
        console.log(searchValue.target.value);
        setSearchQuery(searchValue.target.value);
    }

    return [
        <h1>Search</h1>,
        <TextField
        value={searchQuery}
        onChange={updateSearch}
        onKeyPress={(event) => {
            if (event.key === "Enter") {
                submitSearch(searchQuery);
            }
        }}
        />
    ];
};

export default SearchBar;