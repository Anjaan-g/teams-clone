// import { Navigation } from "./components/Layout/Navigation";
// import { Sidebar } from "./components/Layout/Sidebar";
import React from "react";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/* <Navigation /> */}
            <div className="main-content flex justify-between items-start gap-4 h-full bg-secondary">
                {/* <Sidebar /> */}
                {children}
            </div>
        </>
    );
};
