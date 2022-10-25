import React from "react"
import About from "../pages/About"
import CoffeeShops from "../pages/CoffeeShops"
import Libraries from "../pages/Libraries"
import Universities from "../pages/Universities"
import InstanceCoffee from "../general_components/InstanceCoffee"
import Navigation from "../general_components/Navigation"
import Paginate from "../general_components/Pagination"
import renderer, { act } from 'react-test-renderer'

it("Renders About page", async () => {
    const tree = renderer.create(<About/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it("Renders Coffee Shops page", async () => {
    const tree = renderer.create(<CoffeeShops/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it("Renders Libraries page", async () => {
    const tree = renderer.create(<Libraries/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it("Renders Universities page", async () => {
    const tree = renderer.create(<Universities/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it("Renders Navigation bar", async () => {
    const tree = renderer.create(<Navigation/>).toJSON();
    expect(tree).toMatchSnapshot();
});

it("Renders Pagination Component", async () => {
    const tree = renderer.create(<Paginate/>).toJSON();
    expect(tree).toMatchSnapshot();
});