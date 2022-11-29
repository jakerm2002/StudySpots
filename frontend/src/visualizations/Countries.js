import { useEffect, useState } from "react";
import { Box, Typography, Slider, Stack } from '@mui/material';
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";

const Countries = () => {
    const [allData, setAllData] = useState([]);
    const [areaRange, setAreaRange] = useState([0, 18000]);
    const [populationRange, setPopulationRange] = useState([0, 1450]);
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
            setAllData(temp);
            setAreaRange([0, 18000]);
            setPopulationRange([0, 1450]);
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

    function updateData() {
        let temp = [];
        for (let i = 0; i < allData.length; i++) {
            if (allData[i]["area"] >= areaRange[0] && allData[i]["area"] <= areaRange[1]
             && allData[i]["population"] >= populationRange[0] && allData[i]["population"] <= populationRange[1]) {
                temp.push(allData[i]);
            }
        }
        return temp;
    }

    const handleAreaChange = (event, newAreaRange) => {
        setAreaRange(newAreaRange);
        let temp = updateData();
        setData(temp);
    }
    
    const handlePopulationChange = (event, newPopulationRange) => {
        setPopulationRange(newPopulationRange);
        let temp = updateData();
        setData(temp);
    }

    return <>
    <Stack justifyContent="center">
        <h3>Area vs Population of a Country</h3>
        <Box
            justifyContent="center"
            alignItems="center"
        >
            <h6>Area Range</h6>
            <Slider
                sx={{width: '75%'}}
                getAriaLabel={() => "Area Range"}
                value={areaRange}
                onChange={handleAreaChange}
                valueLabelDisplay="auto"
                min={0}
                max={18000}
            />
            <h6>Population Range</h6>
            <Slider
                sx={{width: '75%'}}
                getAriaLabel={() => "Population Range"}
                value={populationRange}
                onChange={handlePopulationChange}
                valueLabelDisplay="auto"
                min={0}
                max={1450}
            />
        </Box>
        <ResponsiveContainer width="100%" height={450}>
            <ScatterChart margin={{
                right: 50, left: 50
            }}>
                <CartesianGrid/>
                <XAxis type="number" dataKey="area" height={40} domain={areaRange}>
                    <Label
                        value="Area of the Country (in 1000 km^2)"
                        position="insideBottom"
                        style={{textAnchor: "middle"}}
                    />
                </XAxis>
                <YAxis type="number" dataKey="population" domain={populationRange}>
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