import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import Details from "./pages/Details/Details";
import Activity from "./pages/Activity/Activity";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Content from "./pages/Content/Content";
import PrivateRoutes from "./router/PrivateRoutes";
import { ErrorContextProvider } from "./context/ErrorContext";
import { HelmetProvider } from "react-helmet-async";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import route from "./router/route.json";
import "./App.css";
import BuildActivity from "./pages/BuildActivity/BuildActivity";
import ContentActivity from "./pages/ContentActivity/ContentActivity";
import ContentActivities from "./pages/ContentActivities/ContentActivities";
import { StaticContentProvider } from "./context/StaticContentContext";
import PopularActivities from "./components/PopularActivities/PopularActivities.tsx";
import SaveActivity from "./pages/SavedActivity/SavedActivity";
import SavedActivities from "./pages/SavedActivities/SavedActivities";
import { CookiesProvider } from "./context/CookiesContext";
import { SavedProvider } from "./context/SavedContext";
import Edit from "./pages/Edit/Edit";
import Admin from "./pages/Admin/Admin";

function App() {
    return (
        <HelmetProvider>
            <CookiesProvider>
                <ErrorContextProvider>
                    <StaticContentProvider>
                        <AuthProvider>
                            <ContentProvider>
                                <SavedProvider>
                                    <ReactNotifications className="react-notifications" />
                                    <Router>
                                        <Routes>
                                            <Route element={<PrivateRoutes />}>
                                                <Route path={route.home} element={<Home />} />
                                                <Route path={route.details} element={<Details />} />
                                                <Route
                                                    path={route.build}
                                                    element={<BuildActivity />}
                                                />
                                                <Route
                                                    path={route.activity}
                                                    element={<Activity />}
                                                />
                                                <Route
                                                    path={route.edit}
                                                    element={<Edit />}
                                                />
                                            </Route>
                                            <Route
                                                path={route.privacyPolicy}
                                                element={<PrivacyPolicy />}
                                            />
                                            <Route path={route.content} element={<Content />} />
                                            <Route
                                                path={route.myactivities}
                                                element={<SavedActivities />}
                                            />
                                            <Route
                                                path={route.savedActivity}
                                                element={<SaveActivity />}
                                            />

                                            <Route
                                                path={route.popularActivities}
                                                element={<PopularActivities />}
                                            />
                                            <Route
                                                path={route.contentActivities}
                                                element={<ContentActivities />}
                                            />
                                            <Route
                                                path={route.contentActivity}
                                                element={<ContentActivity />}
                                            />
                                            <Route
                                                path={route.all}
                                                element={<Navigate replace to={route.home} />}
                                            />
                                            <Route path={route.admin} element={<Admin />} />
                                        </Routes>
                                    </Router>
                                </SavedProvider>
                            </ContentProvider>
                        </AuthProvider>
                    </StaticContentProvider>
                </ErrorContextProvider>
            </CookiesProvider>
        </HelmetProvider>
    );
}
export default App;
