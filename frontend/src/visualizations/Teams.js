import { useEffect, useState } from "react";
import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import axios from "axios";
import randomColor from "randomcolor";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Teams = () => {
    const [allData, setAllData] = useState([]);
    const [teams, setTeams] = useState([]);
    const [currentTeam, setCurrentTeam] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        let urls = [];
        for (let page = 1; page <= 80; page++) {
            urls.push("https://api.soccerstars.me/teams?page=" + page);
        }

        let promises = [];
        urls.forEach((url) => {
            promises.push(axios.get(url));
        });

        Promise.all(promises).then((results) => {
            let temp = [];
            let teamsTemp = [];
            results.forEach((response) => {
                let teamList = response.data["data"];
                for (let i = 0; i < teamList.length; i++) {
                    let name = teamList[i]["name"];
                    teamsTemp.push(name + " - " + teamList[i]["governing_country"]);
                    temp.push({
                        "label": name + " - " + teamList[i]["governing_country"],
                        "goals": teamList[i]["goals"],
                        "goals_against": teamList[i]["goals_against"],
                        "wins": teamList[i]["wins"],
                        "losses": teamList[i]["losses"],
                    })
                }
            });
            setAllData(temp);
            setTeams(teamsTemp);
            setCurrentTeam(teamsTemp[0]);
        })
    }, []);

    useEffect(() => {
        for(let i = 0; i < allData.length; i++) {
            if (allData[i]["label"] === currentTeam) {
                setData([
                    {
                        "name": "Wins",
                        "value": allData[i]["wins"],
                        "fill": randomColor(),
                    },
                    {
                        "name": "Losses",
                        "value": allData[i]["losses"],
                        "fill": randomColor()
                    },
                    {
                        "name": "Goals",
                        "value": allData[i]["goals"],
                        "fill": randomColor()
                    },
                    {
                        "name": "Goals Against",
                        "value": allData[i]["goals_against"],
                        "fill": randomColor()
                    },
                ])
            }
        }
    }, [currentTeam]);

    return <>
    <Stack justifyContent="center" marginTop="20px">
        <h3>Teams</h3>
        <Box display="flex" alignItems="center" justifyContent="center">
            <Autocomplete
                disablePortal
                value={currentTeam}
                options={teams}
                sx={{width: '50%'}}
                renderInput={(params) => <TextField {...params} label="Team"/>}
                onInputChange={(event, value) => {
                    setCurrentTeam(value);
                }}
            />
        </Box>
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data}>
                <CartesianGrid/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip payload={data}/>
                <Bar dataKey="value"/>
            </BarChart>
        </ResponsiveContainer>
    </Stack>
    </>
}

export default Teams;