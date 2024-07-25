import {Container} from "@/app/components/Container";
import {DashboardPageHeader} from "@/app/dashboard/components/DashboardPageHeader";
import React from "react";
import {DashboardPageBody} from "@/app/dashboard/components/DashboardPageBody";

export default function DashboardPage() {
    return (
        <div className="flex flex-col">
            <h3 className="font-inter text-black text-4xl ">Mes livres</h3>
            <DashboardPageHeader/>
            <DashboardPageBody/>
        </div>
    );
}