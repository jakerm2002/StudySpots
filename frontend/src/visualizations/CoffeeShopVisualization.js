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


const CoffeeShopVisualization = () => {
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
            urls.push(`http://localhost:5000/coffeeshops?latitude=${currentUniversity.latitude}&longitude=${currentUniversity.longitude}`);

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
                        let current = list[i];
                        if (current.rating >= 3.5) {
                            for (let j = 0; j < tempData.length; j++) {
                                if (current.rating === tempData[j]["rating"]) {
                                    tempData[j]["count"]++;
                                }
                            }
                        } else {
                            tempData[0]["count"]++;
                        }
                    }

                });
                setData(tempData);
            });
        }
    }, [currentUniversity]);


    console.log(data);

    let results;
    if (currentUniversity) {
        results = <ResponsiveContainer width="50%" height={450}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="green" />
            </BarChart>
        </ResponsiveContainer>
    } else {
        results = <Box margin="50px"><h3>Select a university</h3></Box>
    }

    return <>
        <Stack justifyContent="center" alignItems="center" marginTop="20px">
            <h3>Nearby Coffee Shop Ratings</h3>
            <h6>Ratings of coffee shops within 25 miles of the selected university</h6>
            <br/>
            <UniversitySelect currentUniversity={currentUniversity} setCurrentUniversity={setCurrentUniversity} />
            {results}
        </Stack>
    </>
}

export default CoffeeShopVisualization;