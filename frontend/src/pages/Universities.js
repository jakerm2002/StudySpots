import React from 'react'
import api_results from '../api_resources/universities.json'
import getModel from '../general_components/ModelPageTemplate';
var currencyFormat = '{style: "decimal", minimumFractionDigits: 2}';
var populationFormat = '{style: "decimal", minimumFractionDigits: 2}';

const Universities = () => {
    const Entries = api_results.results.map(
        (info) => {
            return(
                <tr onClick={() => window.location.href = "Universities"}>
                    <td title={info.latest.school.name}>{info.latest.school.name}</td>
                    <td title={info.latest.school.city}>{info.latest.school.city}</td>
                    <td title={info.latest.school.zip}>{info.latest.school.zip}</td>
                    <td title={info.latest.student.size}>{info.latest.student.size.toLocaleString("en-US", populationFormat)}</td>
                    <td title={info.latest.student.size}>${info.latest.cost.tuition.in_state.toLocaleString("en-US", currencyFormat)}</td>
                    <td title={info.latest.student.size}>${info.latest.cost.tuition.out_of_state.toLocaleString("en-US", currencyFormat)}</td>
                </tr>
            )
        }
    );
    console.log(Entries);
    var payload = {
        entries : Entries,
        pageName : "Universities",
        fields : ["Name", "City", "Zip", "Undergraduate Population", "In State Tuition", "Out of State Tuition"]
    }
    return getModel(payload);
}

export default Universities;