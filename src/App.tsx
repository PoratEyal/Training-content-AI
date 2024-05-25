import React, { useEffect } from "react";
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
    useEffect(() => {
        window.location.href = "https://activitywiz.com/";
    }, []);

    return (
        <HelmetProvider>
            <ErrorContextProvider>
                <AuthProvider>
                    <ContentProvider>
                        <ReactNotifications className="react-notifications" />
                        <Router>
                            <Routes>
                                <Route element={<PrivateRoutes />}>
                                    <Route
                                        path="/"
                                        element={
                                            <>
                                                <Helmet>
                                                    <title>Activity Wiz - פעילויות</title>
                                                    <meta
                                                        name="description"
                                                        content="צרו בקלות פעילויות מותאמות אישית באמצעות כלי בינה מלאכותית.
                                                        מתאים לארועי חברה, לכל תנועות הנוער, פעולות צופים, הנוער העובד, בני עקיבא ועוד"
                                                    />
                                                    <link rel="canonical" href="/" />
                                                </Helmet>
                                                <Home />
                                            </>
                                        }
                                    />
                                    <Route
                                        path="/details"
                                        element={
                                            <>
                                                <Helmet>
                                                    <title>בונה פעולות</title>
                                                    <meta
                                                        name="description"
                                                        content="צרו בקלות פעילויות מותאמות אישית באמצעות כלי בינה מלאכותית.
                                                        מתאים לארועי חברה, לכל תנועות הנוער, פעולות צופים, הנוער העובד, בני עקיבא ועוד"
                                                    />
                                                    <link rel="canonical" href="/details" />
                                                </Helmet>
                                                <Details />
                                            </>
                                        }
                                    />
                                    <Route
                                        path="/choosePath"
                                        element={
                                            <>
                                                <Helmet>
                                                    <title>בונה פעולות</title>
                                                    <meta
                                                        name="description"
                                                        content="צרו בקלות פעילויות מותאמות אישית באמצעות כלי בינה מלאכותית.
                                                        מתאים לארועי חברה, לכל תנועות הנוער, פעולות צופים, הנוער העובד, בני עקיבא ועוד"
                                                    />
                                                    <link rel="canonical" href="/choosePath" />
                                                </Helmet>
                                                <ChoosePath />
                                            </>
                                        }
                                    />
                                    <Route
                                        path="/activity"
                                        element={
                                            <>
                                                <Helmet>
                                                    <title>בונה פעולות</title>
                                                    <meta
                                                        name="description"
                                                        content="צרו בקלות פעילויות מותאמות אישית באמצעות כלי בינה מלאכותית.
                                                        מתאים לארועי חברה, לכל תנועות הנוער, פעולות צופים, הנוער העובד, בני עקיבא ועוד"
                                                    />
                                                    <link rel="canonical" href="/activity" />
                                                </Helmet>
                                                <Activity />
                                            </>
                                        }
                                    />
                                </Route>
                                <Route
                                    path="/privacyPolicy"
                                    element={
                                        <>
                                            <Helmet>
                                                <title>בונה פעולות</title>
                                                <meta
                                                    name="description"
                                                    content="צרו בקלות פעילויות מותאמות אישית באמצעות כלי בינה מלאכותית.
                                                    מתאים לארועי חברה, לכל תנועות הנוער, פעולות צופים, הנוער העובד, בני עקיבא ועוד"
                                                />
                                                <link rel="canonical" href="/privacyPolicy" />
                                            </Helmet>
                                            <PrivacyPolicy />
                                        </>
                                    }
                                />
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
