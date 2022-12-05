import { useEffect, useState } from "react";
import { Box, Stack } from '@mui/material';
import { CartesianGrid, Label, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import UniversitySelect from "../components/visualizations/UniversitySelect";
import axios from "axios";

const temp = [
    {
        "rating": "N/A",
        "count": 0
    },
    {
        "rating": "3 or less",
        "count": 0
    },
    {
        "rating": 3.5,
        "count": 0
    },
    {
        "rating": 4,
        "count": 0
    },
    {
        "rating": 4.5,
        "count": 0
    },
    {
        "rating": 5,
        "count": 0
    },
]

const Libraries = () => {
    const [data, setData] = useState(temp);
    const [currentUniversity, setCurrentUniversity] = useState({ label: 'The University of Texas at Austin', latitude: 30.282825, longitude: -97.738273 });

    useEffect(() => {
        if (currentUniversity != null) {
            let urls = [];
            urls.push(`https://api.studyspots.me/libraries?latitude=${currentUniversity.latitude}&longitude=${currentUniversity.longitude}`);

            let promises = []
            urls.forEach((url) => {
                promises.push(axios.get(url));
            });

            Promise.all(promises).then((results) => {
                let tempData = JSON.parse(JSON.stringify(temp));
                results.forEach((response) => {
                    let list = response.data;
                    for (let i = 0; i < list.length; i++) {
                        let currentRating = list[i].rating;
                        //round to nearest 0.5
                        currentRating = Math.round(currentRating * 2) / 2;
                        if (currentRating >= 3.5) {
                            for (let j = 2; j < tempData.length; j++) {
                                if (currentRating === tempData[j]["rating"]) {
                                    tempData[j]["count"]++;
                                }
                            }
                        } else if (currentRating == -1) {
                            tempData[0]["count"]++;
                        }
                        else {
                            tempData[1]["count"]++;
                        }
                    }

                });
                tempData.reverse(); //so 5 star ratings show up at the top of the chart
                setData(tempData);
            });
        } else {
            setData([]);
        }
    }, [currentUniversity]);

    let results;
    if (currentUniversity) {
        results = <ResponsiveContainer width="50%" height={450}>
            <BarChart layout="vertical" data={data} margin={{bottom: 10}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number">
                    <Label
                        value="Amount of reviews"
                        position="insideBottom"
                        style={{ textAnchor: "middle" }}
                        offset={-10}
                    />
                </XAxis>
                <YAxis type="category" dataKey="rating">
                    <Label
                        value="Rating (number of stars)"
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip />
                <Bar dataKey="count" fill="green" />
            </BarChart>
        </ResponsiveContainer>
    } else {
        results = <Box sx={{ border: 1 }} margin="10px" padding="200px"><h3>Select a university</h3></Box>
    }

    return <>
        <Stack justifyContent="center" alignItems="center" marginTop="20px" marginBottom="50px" paddingBottom="50px">
            <h3>Nearby Library Ratings</h3>
            <h6>Distribution of ratings for libraries within 25 miles of the selected university</h6>
            <br />
            <UniversitySelect currentUniversity={currentUniversity} setCurrentUniversity={setCurrentUniversity} />
            {results}
        </Stack>
    </>
}

export default Libraries;