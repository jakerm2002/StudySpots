import { useEffect, useState } from "react";
import { Box, Typography, Stack } from '@mui/material';
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";

const Countries = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let urls = [];
        for (let page = 1; page <= 10; page++) {
            urls.push("https://api.soccerstars.me/countries?page=" + page);
        }

        let promises = []
        urls.forEach((url) => {
            promises.push(axios.get(url));
        });

        Promise.all(promises).then((results) => {
            let temp = [];
            results.forEach((response) => {
                let countryList = response.data["data"];
                for (let i = 0; i < countryList.length; i++) {
                    let country = countryList[i]["name"];
                    let area = countryList[i]["area"];
                    let population = countryList[i]["population"];
                    temp.push({
                        "country": country,
                        "area": area/1000,
                        "population": population/1000000,
                    })
                }
            });
            setData(temp);
        });
    }, []);

    const CustomTooltip = ({active, payload }) => {
        if (active) {
            return (
                <Box
                    sx={{
                        backgroundColor: "white",
                        padding: "8px",
                        border: "1px solid black",
                    }}
                >
                    <Typography>{"Country: " + payload[0].payload.country}</Typography>
                    <Typography>{"Area: " + payload[0].payload.area}</Typography>
                    <Typography>{"Population: " + payload[0].payload.population}</Typography>
                </Box>
            )
        }
    }

    return <>
    <Stack justifyContent="center">
        <h3>Area vs Population of a Country</h3>
        <ResponsiveContainer width="100%" height={450}>
            <ScatterChart margin={{
                right: 50, left: 50
            }}>
                <CartesianGrid/>
                <XAxis type="number" dataKey="area" height={40}>
                    <Label
                        value="Area of the Country (in 1000 km^2)"
                        position="insideBottom"
                        style={{textAnchor: "middle"}}
                    />
                </XAxis>
                <YAxis type="number" dataKey="population" domain={[0, 1000]}>
                    <Label
                        value="Population of the Country (in millions)"
                        angle={-90}
                        position="insideLeft"
                        style={{textAnchor: "middle"}}
                    />
                </YAxis>
                <Scatter data={data} fill="green"/>
                <Tooltip content={<CustomTooltip/>}/>
            </ScatterChart>
        </ResponsiveContainer>
    </Stack>
    </>
}

export default Countries;