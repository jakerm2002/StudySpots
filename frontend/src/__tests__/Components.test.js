import React from "react"
import { render, screen, cleanup } from '@testing-library/react'
import ExactFilterBar from "../general_components/ExactFilterBar"
import TravelTime from "../general_components/TravelTime"
import SearchBar from "../general_components/SearchBar"
import {RangeFilterBar} from "../general_components/RangeFilterBar"
import { BrowserRouter } from "react-router-dom"

afterEach(cleanup);

describe("Test Search Bar", () => {
    test("Proper Rendering of Search Bar", () => {
        const originalError = console.error; 
        console.error = jest.fn();
        render(<SearchBar/>, {wrapper: BrowserRouter});
        
        expect(screen.getByText("Search")).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();

        console.error = originalError;
    });

});

describe("Test Exact Filter Bar", () => {
    test("Proper Rendering of Exact Filter Bar", () => {
        const originalError = console.error; 
        console.error = jest.fn();
        render(<ExactFilterBar/>, {wrapper: BrowserRouter});
        
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toHaveDisplayValue("");

        console.error = originalError;
    });

});

describe("Test Travel Time", () => {
    test("Proper Rendering of Travel Time", () => {
        const originalError = console.error; 
        console.error = jest.fn();
        render(<TravelTime/>, {wrapper: BrowserRouter});
        
        expect(screen.getByRole('button', {name: "Get travel time"})).toBeInTheDocument();

        console.error = originalError;
    });

});

