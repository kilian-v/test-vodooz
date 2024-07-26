import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";
import {ReactReduxProvider} from "@/app/components/ReactReduxProvider";

import { loadEnvConfig } from '@next/env'
import {DashboardPageBody} from "@/app/dashboard/components/DashboardPageBody";
import {element} from "prop-types";

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

const SECONDS = 1000;
describe("Dashboard", () => {
    window.ResizeObserver = ResizeObserver;

    it("renders a heading", () => {
        render(<ReactReduxProvider><DashboardPage/></ReactReduxProvider>);

        const heading = screen.getByRole("heading", {
            name: "Mes livres",
        });


        expect(heading).toBeInTheDocument();

    });

    it("see if default per page is 10", () => {
        render(<ReactReduxProvider><DashboardPage/></ReactReduxProvider>);

        const selectedPerPage = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'span' && element.id === 'per-page-selected';
        });

        expect(selectedPerPage).toHaveTextContent('10');
    });

    it("see if default current page is correct ", () => {
        render(<ReactReduxProvider><DashboardPage/></ReactReduxProvider>);

        const currentPage = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'span' && element.id === 'current-page';
        });

        expect(currentPage).toHaveTextContent('1');
    });

    it("see if current page change on next page click ", async () => {
        render(<ReactReduxProvider><DashboardPage/></ReactReduxProvider>);



        const currentPage = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'span' && element.id === 'current-page';
        });

        const nextPage = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'button' && element.id === 'next-page-button';
        })

        await act(async () => {

            await new Promise((r) => setTimeout(r, 120000));

            console.log(nextPage.disabled);
            expect(nextPage).not.toBeDisabled();



        })




        expect(currentPage).toHaveTextContent('1');
    }, 300 * SECONDS);

});