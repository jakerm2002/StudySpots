import React from "react"
import About from "../pages/About"
import CoffeeShops from "../pages/CoffeeShops"
import Libraries from "../pages/Libraries"
import Universities from "../pages/Universities"
import Splash from "../pages/Splash"
import { ModelCards, AboutCard, SlideShow } from "../pages/Splash"
import Navigation from "../general_components/Navigation"
import Paginate from "../general_components/Pagination"
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"

afterEach(cleanup);

//TODO: add mockup for axios for testing purposes

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
    test("Proper Rendering of Splash Page", () => {
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

    test("Proper Rendering of Model Cards", ()=> {
        const originalError = console.error;
        console.error = jest.fn();
        render(<ModelCards/>, {wrapper: BrowserRouter});

        // Make sure all of the parts of the Model Cards is included
        expect(screen.getByText("Model Cards")).toBeInTheDocument();
        expect(screen.getByText("Universities")).toBeInTheDocument();
        expect(screen.getByText("Find your university!")).toBeInTheDocument();
        expect(screen.getByText("Coffee Shops")).toBeInTheDocument();
        expect(screen.getByText("Find coffee shops near you!")).toBeInTheDocument();
        expect(screen.getByText("Libraries")).toBeInTheDocument();
        expect(screen.getByText("Find Libraries near you!")).toBeInTheDocument();
        expect(screen.getAllByRole("button")).toHaveLength(3);

        console.error = originalError;
    });

    test("Proper Rendering of About Card", ()=> {
        const originalError = console.error;
        console.error = jest.fn();
        render(<AboutCard/>, {wrapper: BrowserRouter});

        // Make sure all of the parts of the About Card is included
        expect(screen.getByText("Meet Our Team")).toBeInTheDocument();
        expect(screen.getByText("Find out more about our team and our mission.")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Learn more"})).toBeInTheDocument();

        console.error = originalError;
    });

    test("Proper Rendering of SlideShow", ()=> {
        const originalError = console.error;
        console.error = jest.fn();
        render(<SlideShow/>, {wrapper: BrowserRouter});

        // Make sure all of the parts of the SlideShow is included
        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        expect(screen.getAllByRole("img")).toHaveLength(3);
        expect(screen.getAllByRole("button")).toHaveLength(5);
        expect(screen.getAllByText("Welcome to StudySpots!")).toHaveLength(3);
        expect(screen.getAllByText("Connect with your community by discovering new coffee shops and libraries near your university")).toHaveLength(3);

        console.error = originalError;
    });

});


describe("Test Coffee Shops Page", () => {
    test("Proper Rendering of Coffee Shops Page", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<CoffeeShops/>)
        
        // Make sure all the parts of the Splash page is included
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("City")).toBeInTheDocument();
        expect(screen.getByText("Price")).toBeInTheDocument();
        expect(screen.getByText("Rating")).toBeInTheDocument();
        expect(screen.getByText("Open/Closed")).toBeInTheDocument();

        console.error = originalError;
    });

});

describe("Test Libraries Page", () => {
    test("Proper Rendering of Libraries Page", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<Libraries/>)
        
        // Make sure all the parts of the Splash page is included
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Location")).toBeInTheDocument();
        expect(screen.getByText("Rating")).toBeInTheDocument();
        expect(screen.getByText("Telephone")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();


        console.error = originalError;
    });

});

describe("Test Universities Page", () => {
    test("Proper Rendering of Universities Page", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<Universities/>)
        
        // Make sure all the parts of the Splash page is included
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("City")).toBeInTheDocument();
        expect(screen.getByText("Zip")).toBeInTheDocument();
        expect(screen.getByText("Undergraduate Population")).toBeInTheDocument();
        expect(screen.getByText("In State Tuition")).toBeInTheDocument();
        expect(screen.getByText("Out of State Tuition")).toBeInTheDocument();

        console.error = originalError;
    });

});

describe("Test Pagination", () => {
    test("Proper Rendering of Pagination", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<Paginate/>)

        expect(screen.getByText("Next")).toBeInTheDocument();
        expect(screen.getByText("More")).toBeInTheDocument();

        console.error = originalError;
    });

});
