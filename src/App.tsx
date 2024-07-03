import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import Details from "./pages/Details/Details";
import ChoosePath from "./pages/ChoosePath/ChoosePath";
import Activity from "./pages/Activity/Activity";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import PrivateRoutes from "./router/PrivateRoutes";
import { ErrorContextProvider } from "./context/ErrorContext";
import { HelmetProvider } from "react-helmet-async";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import route from "./router/route.json";
import "./App.css";
import Maintenance from "./pages/Maintenance/Maintenance";
import Status from "./pages/Status/Status";

function App() {
    return (
        <HelmetProvider>
            <ErrorContextProvider>
                <AuthProvider>
                    <ContentProvider>
                        <ReactNotifications className="react-notifications" />
                        <Router>
                            <Routes>
                                <Route element={<PrivateRoutes />}>
                                    <Route path={route.home} element={<Home />} />
                                    <Route path={route.details} element={<Details />} />
                                    <Route path={route.choosePath} element={<ChoosePath />} />
                                    <Route path={route.activity} element={<Activity />} />
                                </Route>
                                <Route path={route.privacyPolicy} element={<PrivacyPolicy />} />
                                {/* <Route path={route.status} element={<Status />} /> */}
                                <Route path={route.all} element={<Navigate replace to={route.home} />} />
                            </Routes>
                        </Router>
                    </ContentProvider>
                </AuthProvider>
            </ErrorContextProvider>
        </HelmetProvider>
    );
}

export default App;
