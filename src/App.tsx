import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import Details from "./pages/Details/Details";
import ChoosePath from "./pages/ChoosePath/ChoosePath";
import Activity from "./pages/Activity/Activity";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import PrivateRoutes from "./components/PrivateRoutes";
import { ErrorContextProvider } from "./context/ErrorContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import "./App.css";
import Maintenance from "./pages/Maintenance/Maintenance";

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
                                    <Route path="/" element={<Home />} />
                                    <Route path="/details" element={<Details />} />
                                    <Route path="/choosePath" element={<ChoosePath />} />
                                    <Route path="/activity" element={<Activity />} />
                                </Route>
                                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                                <Route path={"*"} element={<Navigate replace to="/" />} />
                            </Routes>
                        </Router>
                    </ContentProvider>
                </AuthProvider>
            </ErrorContextProvider>
        </HelmetProvider>
    );
}

export default App;
