import React from "react"
import About from "../pages/About"
import CoffeeShops from "../pages/CoffeeShops"
import Libraries from "../pages/Libraries"
import Universities from "../pages/Universities"
import Splash from "../pages/Splash"
import Search from "../pages/Search"
import { ModelCards, AboutCard, SlideShow } from "../pages/Splash"
import Navigation from "../components/nav/Navigation"
import Paginate from "../components/model_components/Pagination"
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"

afterEach(cleanup);

//TODO: add mockup for axios for testing purposes

describe("Test Navigation Bar", () => {
    test("Proper Rendering of Navigation Component", () => {
        render(<Navigation />);

        // Make sure all of the navigation bars are included
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Search")).toBeInTheDocument();
        expect(screen.getByText("Coffee Shops")).toBeInTheDocument();
        expect(screen.getByText("Libraries")).toBeInTheDocument();
        expect(screen.getByText("Universities")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
    });

});

describe("Test About Page", () => {
    test("Proper Rendering of Search Page", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<About />);

        // Make sure all the parts of the About page is included
        expect(screen.getByText("About StudySpots")).toBeInTheDocument();
        expect(screen.getByText("Mission")).toBeInTheDocument();
        expect(screen.getByText("Meet the Team")).toBeInTheDocument();
        expect(screen.getByText("Technology Used")).toBeInTheDocument();
        expect(screen.getByText("APIs Scraped")).toBeInTheDocument();
        expect(screen.getByText("Project Links")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: "GitLab Project Repository" }));
        expect(screen.getByRole('button', { name: "Postman API Documentation" }));

        console.error = originalError;

    });
});

describe("Test Search Page", () => {
    test("Proper Rendering of Search Page", async () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<Search />, { wrapper: BrowserRouter });

        // Make sure all the parts of the Search page is included
        await waitFor(() => {
            expect(screen.getByText("Search")).toBeInTheDocument();
            expect(screen.getByText("Coffee Shops")).toBeInTheDocument();
            expect(screen.getByText("Libraries")).toBeInTheDocument();
            expect(screen.getByText("Universities")).toBeInTheDocument();
            expect(screen.getByText("View all CoffeeShop Results")).toBeInTheDocument();
            expect(screen.getByText("View all Library Results")).toBeInTheDocument();
            expect(screen.getByText("View all University Results")).toBeInTheDocument();
        });


        console.error = originalError;

    });
});

describe("Test Splash Page", () => {
    test("Proper Rendering of Splash Page", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<Splash />, { wrapper: BrowserRouter });

        // Make sure all the parts of the Splash page is included
        expect(screen.getByText("Model Cards")).toBeInTheDocument();
        expect(screen.getByText("Find your university!")).toBeInTheDocument();
        expect(screen.getByText("Find coffee shops near you!")).toBeInTheDocument();
        expect(screen.getByText("Find Libraries near you!")).toBeInTheDocument();
        expect(screen.getByText("Meet Our Team")).toBeInTheDocument();

        console.error = originalError;
    });

    test("Proper Rendering of Model Cards", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<ModelCards />, { wrapper: BrowserRouter });

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

    test("Proper Rendering of About Card", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<AboutCard />, { wrapper: BrowserRouter });

        // Make sure all of the parts of the About Card is included
        expect(screen.getByText("Meet Our Team")).toBeInTheDocument();
        expect(screen.getByText("Find out more about our team and our mission.")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Learn more" })).toBeInTheDocument();

        console.error = originalError;
    });

    test("Proper Rendering of SlideShow", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<SlideShow />, { wrapper: BrowserRouter });

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
    test("Proper Rendering of Coffee Shops Page", async () => {
        const originalError = console.error;
        const originalWarn = console.warn;
        console.error = jest.fn();
        console.warn = jest.fn();
        render(<CoffeeShops />, { wrapper: BrowserRouter })

        // Make sure all the parts of the Splash page is included
        await waitFor(() => {
            expect(screen.getByText("Name")).toBeInTheDocument();
            expect(screen.getByText("City")).toBeInTheDocument();
            expect(screen.getAllByText("Price").length !== 0);
            expect(screen.getAllByText("Rating").length !== 0);
            expect(screen.getByText("Hours today")).toBeInTheDocument();
        });

        expect(screen.getByRole("textbox")).toHaveDisplayValue("");


        console.error = originalError;
        console.warn = originalWarn;
    });

});

describe("Test Libraries Page", () => {
    test("Proper Rendering of Libraries Page", async () => {
        const originalError = console.error;
        const originalWarn = console.warn;
        console.error = jest.fn();
        console.warn = jest.fn();
        render(<Libraries />, { wrapper: BrowserRouter })

        // Make sure all the parts of the Splash page is included
        await waitFor(() => {
            expect(screen.getByText("Name")).toBeInTheDocument();
            expect(screen.getByText("Address")).toBeInTheDocument();
            expect(screen.getAllByText("Rating").length !== 0);
            expect(screen.getByText("Phone #")).toBeInTheDocument();
            expect(screen.getByText("Hours today")).toBeInTheDocument();
        });



        console.error = originalError;
        console.warn = originalWarn;
    });

});

describe("Test Universities Page", () => {
    test("Proper Rendering of Universities Page", async () => {
        const originalError = console.error;
        const originalWarn = console.warn;
        console.error = jest.fn();
        console.warn = jest.fn();
        render(<Universities />, { wrapper: BrowserRouter })

        // Make sure all the parts of the Splash page is included
        await waitFor(() => {
            expect(screen.getByText("Name")).toBeInTheDocument();
            expect(screen.getByText("City")).toBeInTheDocument();
            expect(screen.getByText("Zip")).toBeInTheDocument();
            expect(screen.getByText("Undergraduate Population")).toBeInTheDocument();
            expect(screen.getByText("In State Tuition")).toBeInTheDocument();
            expect(screen.getByText("Out of State Tuition")).toBeInTheDocument();
        });

        console.error = originalError;
        console.warn = originalWarn;
    });

});

describe("Test Pagination", () => {
    test("Proper Rendering of Pagination", () => {
        const originalError = console.error;
        console.error = jest.fn();
        render(<Paginate />, { wrapper: BrowserRouter })

        expect(screen.getByText("Next")).toBeInTheDocument();
        expect(screen.getByText("More")).toBeInTheDocument();

        console.error = originalError;
    });

});
