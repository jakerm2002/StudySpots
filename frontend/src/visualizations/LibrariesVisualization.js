//average coffee shop rating by state
//OR
//distribution of coffee shop ratings


//pick nearby university and get bar chart of coffee shop star ratings


//most reviewed coffee shops per university

//make the nearby api return all coffee shops within 25 miles of LAT and LONG
//with no limit to the number of results

//add autocomplete for university names

import { useEffect, useState, useMemo, Fragment } from "react";
import { Box, Stack } from '@mui/material';
import { CartesianGrid, Label, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, BarChart, Legend, Bar } from "recharts";
import { useSearchParams } from 'react-router-dom';
import UniversitySelect from "../general_components/UniversitySelect";
import axios from "axios";


// import UniversityDropdown from "../general_components/UniversityDropdown";
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
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentUniversity, setCurrentUniversity] = useState({ label: 'The University of Texas at Austin', latitude: 30.282825, longitude: -97.738273 });

    useEffect(() => {
        console.log("change to currentUniversity");
        console.log(currentUniversity)

        if (currentUniversity == null) {
            setData([])
        }

        if (currentUniversity != null) {
            let urls = [];
            urls.push(`http://localhost:5000/libraries?latitude=${currentUniversity.latitude}&longitude=${currentUniversity.longitude}`);

            let promises = []
            urls.forEach((url) => {
                promises.push(axios.get(url));
            });

            Promise.all(promises).then((results) => {
                let tempData = JSON.parse(JSON.stringify(temp));
                results.forEach((response) => {
                    console.log(response.data);

                    console.log(tempData);
                    let list = response.data;
                    for (let i = 0; i < list.length; i++) {
                        let currentRating = list[i].rating;
                        //round to nearest 0.5
                        currentRating = Math.round(currentRating*2)/2;
                        console.log(currentRating);
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
        }
    }, [currentUniversity]);


    console.log(data);

    let results;
    if (currentUniversity) {
        results = <ResponsiveContainer width="50%" height={450}>
            <BarChart layout="vertical" data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="rating" />
                <Tooltip />
                <Bar dataKey="count" fill="green" />
            </BarChart>
        </ResponsiveContainer>
    } else {
        results = <Box sx={{ border: 1 }} margin="10px" padding="200px"><h3>Select a university</h3></Box>
    }

    return <>
        <Stack justifyContent="center" alignItems="center" marginTop="20px">
            <h3>Nearby Library</h3>
            <h6>Distribution of ratings for libraries within 25 miles of the selected university</h6>
            <br/>
            <UniversitySelect currentUniversity={currentUniversity} setCurrentUniversity={setCurrentUniversity} />
            {results}
        </Stack>
    </>
}

export default Libraries;