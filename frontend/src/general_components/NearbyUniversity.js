import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, List, ListItem, ListItemButton, ListItemText} from '@mui/material';

const NearbyUniversity = ({latitude, longitude}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
    axios.get('https://api.studyspots.me/universities?latitude=' + latitude + '&longitude=' + longitude).then(response => {
        setData(response.data);
        setIsLoading(false);
    });
    }, [])

    if (!isLoading && data.length === 0){
        return (
        <Box>
            <h4>Nearby Universities</h4>
            <p>Nearby universities not found</p>
        </Box>
        );
    } else {
        return (
        <Box>
            <h4>Nearby Universities</h4>
            <List>
            {!isLoading && data.map(
                (info) => {
                    return (
                        <ListItem disablePadding>
                            <ListItemButton component="a" href={`/Universities/${info.id}`}>
                                <ListItemText 
                                        style={{textAlign: "center"}}
                                        primary={info.name}
                                    />
                            </ListItemButton>
                        </ListItem>
                    )
                }
            )}
            </List>
        </Box>
        );
    }
}

export default NearbyUniversity