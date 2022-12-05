import React from 'react';
import UniversitiesVisualization from '../visualizations/UniversitiesVisualization';
import CoffeeShopVisualization from '../visualizations/CoffeeShopVisualization';
import LibraryVisualization from '../visualizations/LibrariesVisualization';

const Visualizations = () => {
    return <>
        <UniversitiesVisualization/>
        <CoffeeShopVisualization/>
        <LibraryVisualization/>
    </>
}

export default Visualizations;