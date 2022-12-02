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
import { ResponsiveContainer, PieChart, Pie, Cell, Label, LabelList } from "recharts";
import { useSearchParams } from 'react-router-dom';
import UniversitySelect from "../general_components/UniversitySelect";
import axios from "axios";
import { amber } from "@mui/material/colors";


// import UniversityDropdown from "../general_components/UniversityDropdown";
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
        }
    }, [currentUniversity]);


    console.log(data);

    const COLORS = ['#8f8f8f', '#2fab02', '#ff5500'];

    const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //             {`${(percent * 100).toFixed(0) != 0 ? (percent * 100).toFixed(0) + '%' : ""}`}
    //         </text>
    //     );
    // };

    // const renderCustomizedLabel = ({ active, payload, label }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //             {`${(percent * 100).toFixed(0) != 0 ? (percent * 100).toFixed(0) + '%' : ""}`}
    //         </text>
    //     );
    // };

    let renderLabel = function (entry) {
        if (entry["count"] > 0)
            return `Price: ${entry["rating"]}`;
        return undefined
    }

    let results;
    if (currentUniversity) {
        results = <ResponsiveContainer width="50%" height={450}>
            <PieChart width={400} height={400}>
                <Pie
                    // activeIndex={this.state.activeIndex}
                    // activeShape={renderActiveShape}
                    data={data}
                    dataKey="count"
                    label={renderLabel ?? undefined}
                    // nameKey="rating"
                    // label
                    // label={renderLabel ?? undefined}
                    // cx={100}
                    // cy={125}
                    // innerRadius={60}
                    // outerRadius={80}
                    // fill="#8884d8"
                    // paddingAngle={5}
                    // dataKey="value"
                    // label={
                    //     <CustomLabel
                    //         value1={this.props.avgCal}
                    //         value2={"Avg Calories"}
                    //         value3={this.props.label}
                    //     />
                    // }
                    // labelLine={false}
                    // onMouseEnter={onPieEnter}
                    // onMouseLeave={onPieLeave}
                    cx="50%"
                    cy="50%"
                    // labelLine={false}
                    // label="rating"
                    outerRadius={80}
                    fill="#8884d8"
                >
                    {/* <LabelList
                        dataKey="rating"
                        // fill={fill}
                        position="outside"
                        formatter={label => {                  
                            console.log(label);                            
                            return label > 0 ? label : null;
                        }}
                    /> */}
                    {data.map((entry, index) => (
                        <Cell
                            // key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                    <LabelList
                        dataKey="count"
                        // fill={fill}
                        // position="top"
                        formatter={label => {
                            return label > 0 ? label : null;
                        }}
                    />


                </Pie>

            </PieChart>
        </ResponsiveContainer>
    } else {
        results = <Box sx={{ border: 1 }} margin="10px" padding="200px"><h3>Select a university</h3></Box>
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