import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
};

export default PrivateRoutes;
