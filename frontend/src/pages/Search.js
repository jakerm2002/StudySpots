import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import axios from "axios";

const Search = () => {
    const [currentSearch, setCurrentSearch] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get('http://studyspotstempapi-env.eba-ypjgz4pn.us-east-2.elasticbeanstalk.com/search').then(response => {
            setCurrentSearch(response.data);
            setLoading(false);
        },
        reject => {});
    })

    return (
        <div>
            <h1>Search</h1>
            <div>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
        </div>
    );
}

export default Search;