import { useEffect, useState } from "react";
import { Box, Typography, Stack } from '@mui/material';
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import axios from "axios";

const UniversitiesVisualization = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let urls = [];
        urls.push("https://api.studyspots.me/universities?per_page=300");

        let promises = []
        urls.forEach((url) => {
            promises.push(axios.get(url));
        });

        Promise.all(promises).then((results) => {
            let temp = [];
            results.forEach((response) => {
                console.log(response.data["results"]);
                let universityList = response.data["results"];
                for (let i = 0; i < universityList.length; i++) {
                    let university = universityList[i]["name"];
                    let average_sat = universityList[i]["sat_average"];
                    let acceptance_rate = universityList[i]["acceptance_rate"];
                    temp.push({
                        "university": university,
                        "average_sat": average_sat,
                        "acceptance_rate": acceptance_rate,
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
                    <Typography>{payload[0].payload.university}</Typography>
                    <Typography>{"Average SAT: " + payload[0].payload.average_sat}</Typography>
                    <Typography>{"Acceptance Rate: " + payload[0].payload.acceptance_rate}</Typography>
                </Box>
            )
        }
    }

    return <>
    <Stack justifyContent="center">
        <h3>Average SAT Score vs Acceptance Rate</h3>
        <ResponsiveContainer width="100%" height={450}>
            <ScatterChart margin={{
                right: 50, left: 50
            }}>
                <CartesianGrid/>
                <XAxis type="number" dataKey="average_sat" height={40} domain={[800, 1600]}>
                    <Label
                        value="Average SAT Score"
                        position="insideBottom"
                        style={{textAnchor: "middle"}}
                    />
                </XAxis>
                <YAxis type="number" dataKey="acceptance_rate" domain={[0, 1]}>
                    <Label
                        value="Acceptance Rate"
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

export default UniversitiesVisualization;