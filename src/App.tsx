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

function App() {
    return (
        <HelmetProvider>
            <ErrorContextProvider>
                <AuthProvider>
                    <ContentProvider>
                        <ReactNotifications />
                        <Router>
                            <Routes>
                                <Route element={<PrivateRoutes />}>
                                    <Route
                                        path="/"
                                        element={
                                            <>
                                                <Helmet>
                                                    <title>בונה פעולות</title>
                                                    <meta
                                                        name="description"
                                                        content="צור פעולות מרתקות ומותאמות אישית, על ידי הזנת פרטים על הקבוצה שלך, באמצעות כלי בינה מלאכותית."
                                                    />
                                                    <link rel="canonical" href="/" />
                                                </Helmet>
                                                <Home />
                                            </>
                                        }
                                    />
                                    <Route
                                        path="/group"
                                        element={
                                            <>
                                                <Helmet>
                                                    <title>בונה פעולות</title>
                                                    <meta
                                                        name="description"
                                                        content="צור פעולות מרתקות ומותאמות אישית, על ידי הזנת פרטים על הפעילות שתרצה להעביר, באמצעות כלי בינה מלאכותית."
                                                    />
                                                    <link rel="canonical" href="/group" />
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
                                                        content="צור פעולות מרתקות ומותאמות אישית, על ידי הזנת פרטים על הפעילות שתרצה להעביר, באמצעות כלי בינה מלאכותית."
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
                                                        content="צור פעולות מרתקות ומותאמות אישית, תוך דקות ספורות, באמצעות כלי בינה מלאכותית. חסוך זמן, התמקד ביצירתיות, והענק לחניכים חוויה חינוכית."
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
                                                    content="עיין במדיניוית הפרטיות של האפליקציה בונה פעולות. האפליקציה נמצאת כרגע בשלב בטא/התנסות ולכן ייתכנו בעיות ותקלות."
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
