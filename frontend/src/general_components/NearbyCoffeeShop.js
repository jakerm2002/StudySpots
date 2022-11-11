import React, { useState, useEffect } from "react";
import styles from './InstanceTemplate.module.css';
import axios from "axios";
import { Box, List, ListItem, ListItemButton, ListItemText} from '@mui/material';

const NearbyCoffeeShop = ({latitude, longitude}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
    axios.get('https://api.studyspots.me/coffeeshops?latitude=' + latitude + '&longitude=' + longitude).then(response => {
        setData(response.data);
        setIsLoading(false);
    },
    reject => {
        console.log("REJECT");
    });
    }, [])

    console.log(data);
    if (!isLoading && data.length == 0){
        return (
        <Box>
            <h4>Nearby Coffee Shops</h4>
            <p>Nearby coffee shops not found</p>
        </Box>);
    } else {
        return (
        <Box>
            <h4>Nearby Coffee Shops</h4>
            <List>
            {!isLoading && data.map(
                (info) => {
                    return(
                        <ListItem>
                            <ListItemButton component="a" href={`/Coffeeshops/${info.id}`}>
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

export default NearbyCoffeeShop