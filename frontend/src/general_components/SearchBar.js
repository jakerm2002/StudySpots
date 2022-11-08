import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TextField } from "@mui/material";

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    const submitSearch = (newSearchQuery) => {
        let newParams = searchParams;
        if (newSearchQuery.length === 0) {
            newParams.delete("search")
        } else {
            newParams.set("search", newSearchQuery);
        }
        setSearchParams(newParams);
    };
    const updateSearch = (searchValue) => {
        setSearchQuery(searchValue.target.value.toLowerCase());
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