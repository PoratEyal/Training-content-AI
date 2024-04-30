import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import Details from "./pages/Details/Details";
import ChoosePath from "./pages/ChoosePath/ChoosePath";
import Activity from "./pages/Activity/Activity";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import PrivateRoutes from "./components/PrivateRoutes";
import { ErrorContextProvider } from "./context/ErrorContext";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
    return (
        <ErrorContextProvider>
            <ContentProvider>
                <ReactNotifications />
                <Router>
                    <Helmet>
                        <title>בונה פעולות לתנועות נוער</title>
                        <meta name="description" content="צור פעולות מרתקות ומותאמות אישית עבור חניכיך תוך דקות ספורות באמצעות כלי בינה מלאכותית חדשניים. חסוך זמן, התמקד ביצירתיות, והענק לחניכים חוויה חינוכית בלתי נשכחת" />
                    </Helmet>
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route path="/" element={
                                <>
                                    <Helmet>
                                        <title>מילוי פרטים על הקבוצה</title>
                                        <meta name="description" content="צור פעולות מרתקות ומותאמות אישית עבור חניכיך תוך דקות ספורות באמצעות כלי בינה מלאכותית חדשניים. חסוך זמן, התמקד ביצירתיות, והענק לחניכים חוויה חינוכית בלתי נשכחת" />
                                    </Helmet>
                                    <Details />
                                </>
                            } />
                            <Route path="/choosePath" element={
                                <>
                                    <Helmet>
                                        <title>בחרו את הפעולה המתאימה ביותר בשבילכם</title>
                                        <meta name="description" content="צור פעולות מרתקות ומותאמות אישית עבור חניכיך תוך דקות ספורות באמצעות כלי בינה מלאכותית חדשניים. חסוך זמן, התמקד ביצירתיות, והענק לחניכים חוויה חינוכית בלתי נשכחת" />
                                    </Helmet>
                                    <ChoosePath />
                                </>
                            } />
                            <Route path="/activity" element={
                                <>
                                    <Helmet>
                                        <title>קבלת פעולה מותאמת אישית בשילוב בינה מלאכותית להדרכת תנועות נוער</title>
                                        <meta name="description" content="צור פעולות מרתקות ומותאמות אישית עבור חניכיך תוך דקות ספורות באמצעות כלי בינה מלאכותית חדשניים. חסוך זמן, התמקד ביצירתיות, והענק לחניכים חוויה חינוכית בלתי נשכחת" />
                                    </Helmet>
                                    <Activity />
                                </>
                            } />
                        </Route>
                        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                        <Route path={"*"} element={<Navigate replace to="/" />} />
                    </Routes>
                </Router>
            </ContentProvider>
        </ErrorContextProvider>
    );
}

export default App;
