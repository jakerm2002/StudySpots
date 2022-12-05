// Tutorial used to create Pie Chart: 
// https://www.tutorialspoint.com/reactjs-how-to-create-a-pie-chart-using-recharts

import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import randomColor from "randomcolor";
import axios from "axios";

const Athletes = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        let urls = [];
        for (let page = 1; page <= 100; page++) {
            urls.push("https://api.soccerstars.me/athletes?page=" + page);
        }

        let promises = []
        urls.forEach((url) => {
            promises.push(axios.get(url));
        });

        Promise.all(promises).then((results) => {
            let temp = [];
            results.forEach((response) => {
                let athleteList = response.data["data"]
                for (let i = 0; i < athleteList.length; i++) {
                    let country = athleteList[i]["country"]
                    let countryInList = false;
                    for (let j = 0; j < temp.length; j++) {
                        if (temp[j].name === country) {
                            temp[j].value += 1;
                            countryInList = true;
                            break;
                        }
                    }
                    if (!countryInList) {
                        temp.push({
                            "name": country,
                            "value": 1,
                            "fill": randomColor()
                        })
                    }
                }
            })
            setData(temp);
        })
    }, []);

    const CustomTooltip = ({ active, payload }) => {
        if (active) {
            return (
                <Box
                    sx={{
                        backgroundColor: "white",
                        padding: "8px",
                        border: "1px solid black",
                    }}
                >
                    <Typography>{"Country: " + payload[0].name}</Typography>
                    <Typography>{"Number of Players: " + payload[0].value}</Typography>
                </Box>
            )
        }
    }

    return <>
    <Stack justifyContent="center" className="topSpacing">
        <h3 className="text">Number of Players per Country</h3>
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                />
                <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
        </ResponsiveContainer>
    </Stack>
    </>
}

export default Athletes;