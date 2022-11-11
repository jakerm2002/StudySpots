import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, List, ListItem, ListItemButton, ListItemText} from '@mui/material';

const NearbyLibrary = ({latitude, longitude}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
    axios.get('https://api.studyspots.me/libraries?latitude=' + latitude + '&longitude=' + longitude).then(response => {
        setData(response.data);
        setIsLoading(false);
    });
    })

    console.log(data);
    if (!isLoading && data.length === 0){
        return (
        <Box>
            <h4>Nearby Libraries</h4>
            <p>Nearby libraries not found</p>
        </Box>
        );
    } else {
        return (
        <Box>
            <h4>Nearby Libraries</h4>
            <List>
                {!isLoading && data.map(
                    (info) => {
                        return(
                            <ListItem>
                                <ListItemButton component="a" href={`/Libraries/${info.id}`}>
                                    <ListItemText primary={info.name}/>
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

export default NearbyLibrary