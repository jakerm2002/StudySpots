import React from "react"
import About from "../pages/About"
import CoffeeShops from "../pages/CoffeeShops"
import Libraries from "../pages/Libraries"
import Universities from "../pages/Universities"
import Splash from "../pages/Splash"
import Navigation from "../general_components/Navigation"
import Paginate from "../general_components/Pagination"
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"

afterEach(cleanup);

describe("Test Navigation Bar", () => {
    test("Proper Rendering of Navigation Component", () => {
        render(<Navigation/>);
        
        // Make sure all of the navigation bars are included
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Coffee Shops")).toBeInTheDocument();
        expect(screen.getByText("Libraries")).toBeInTheDocument();
        expect(screen.getByText("Universities")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
    });

});

describe("Test About Page", () => {
    test("Proper Rendering of About Page", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<About/>);

        // Make sure all the parts of the About page is included
        expect(screen.getByText("StudySpots")).toBeInTheDocument();
        expect(screen.getByText("Mission")).toBeInTheDocument();
        expect(screen.getByText("Discovery")).toBeInTheDocument();
        expect(screen.getByText("Meet the Team")).toBeInTheDocument();
        expect(screen.getByText("Technology Used")).toBeInTheDocument();
        expect(screen.getByText("APIs Scraped")).toBeInTheDocument();
        expect(screen.getByText("Project Links")).toBeInTheDocument();

        console.error = originalError;

    });
});

describe("Test Splash Page", () => {
    it("Proper Rendering of Splash Page", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<Splash/>, {wrapper: BrowserRouter});
        
        // Make sure all the parts of the Splash page is included
        expect(screen.getByText("Model Cards")).toBeInTheDocument();
        expect(screen.getByText("Find your university!")).toBeInTheDocument();
        expect(screen.getByText("Find coffee shops near you!")).toBeInTheDocument();
        expect(screen.getByText("Find Libraries near you!")).toBeInTheDocument();
        expect(screen.getByText("Meet Our Team")).toBeInTheDocument();

        console.error = originalError;
    });

});
