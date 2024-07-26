import { render, screen } from "@testing-library/react";
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


});