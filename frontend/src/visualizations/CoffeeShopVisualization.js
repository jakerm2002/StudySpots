import { useEffect, useState } from "react";
import { Box, Stack } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Cell, LabelList } from "recharts";
import UniversitySelect from "../general_components/UniversitySelect";
import axios from "axios";

const temp = [
    {
        "rating": "N/A",
        "count": 0
    },
    {
        "rating": "$",
        "count": 0
    },
    {
        "rating": "$$",
        "count": 0
    }
]

const CoffeeShopVisualization = () => {
    const [data, setData] = useState(temp);

    const [currentUniversity, setCurrentUniversity] = useState({ label: 'The University of Texas at Austin', latitude: 30.282825, longitude: -97.738273 });

    useEffect(() => {
        if (currentUniversity != null) {
            let urls = [];
            urls.push(`https://api.studyspots.me/coffeeshops?latitude=${currentUniversity.latitude}&longitude=${currentUniversity.longitude}`);

            let promises = []
            urls.forEach((url) => {
                promises.push(axios.get(url));
            });

            Promise.all(promises).then((results) => {
                let tempData = JSON.parse(JSON.stringify(temp));
                results.forEach((response) => {
                    let list = response.data;
                    for (let i = 0; i < list.length; i++) {
                        let current = list[i];
                        if (current.price == "$") {
                            tempData[1]["count"]++;
                        } else if (current.price == "$$") {
                            tempData[2]["count"]++;
                        } else {
                            tempData[0]["count"]++;
                        }
                    }
                });
                setData(tempData);
            });
        } else {
            setData([]);
        }
    }, [currentUniversity]);


    const COLORS = ['#757575', '#2fab02', '#ff5500'];

    let renderLabel = function (entry) {
        if (entry["count"] > 0)
            return `Price: ${entry["rating"]}`;
        return undefined
    }

    let results;
    if (currentUniversity) {
        results = <ResponsiveContainer width="50%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="count"
                    label={renderLabel ?? undefined}
                    fill="#8884d8"
                >
                    {data.map((entry, index) => (
                        <Cell
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                    <LabelList
                        dataKey="count"
                        formatter={label => {
                            return label > 0 ? label : null;
                        }}
                    />
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    } else {
        results = <><Box marginTop="10px"><h3>Select a university</h3><Box sx={{ border: 1, borderRadius: "50%" }} margin="10px" padding="160px"></Box></Box></>
    }

    return <>
        <Stack justifyContent="center" alignItems="center" marginTop="20px">
            <h3>Nearby Coffee Shop Prices</h3>
            <h6>Prices of coffee shops within 25 miles of the selected university</h6>
            <br />
            <UniversitySelect currentUniversity={currentUniversity} setCurrentUniversity={setCurrentUniversity} />
            {results}
        </Stack>
    </>
}

export default CoffeeShopVisualization;