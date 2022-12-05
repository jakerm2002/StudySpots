import React from 'react';
import Athletes from '../visualizations/Athletes';
import Countries from "../visualizations/Countries";
import Teams from "../visualizations/Teams";

const ProviderVisualizations = () => {
    return <>
        <Athletes/>
        <Countries/>
        <Teams/>
    </>
}

export default ProviderVisualizations;