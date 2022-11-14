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
        newParams.set("page", 1);
        setSearchParams(newParams);
    };
    const updateSearch = (searchValue) => {
        setSearchQuery(searchValue.target.value);
    }

    useEffect(() => {
        setSearchQuery(searchParams.get("search") ?? "");
    }, []);

    return [
        <h1 className='text'>Search</h1>,
        <TextField
        value={searchQuery}
        onChange={updateSearch}
        onKeyPress={(event) => {
            if (event.key === "Enter") {
                submitSearch(searchQuery);
                window.location.reload();
            }
        }}
        />
    ];
};

export default SearchBar;