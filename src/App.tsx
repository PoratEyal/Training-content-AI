import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Details from "./pages/Details/Details";
import Activity from "./pages/Activity/Activity";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Content from "./pages/Content/Content";
import PrivateRoutes from "./router/PrivateRoutes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Home from "./pages/Home/Home";
import route from "./router/route.json";
import "./App.css";
import BuildActivity from "./pages/BuildActivity/BuildActivity";
import ContentActivity from "./pages/ContentActivity/ContentActivity";
import ContentActivities from "./pages/ContentActivities/ContentActivities";
import PopularActivities from "./components/PopularActivities/PopularActivities.tsx";
import SaveActivity from "./pages/SavedActivity/SavedActivity";
import SavedActivities from "./pages/SavedActivities/SavedActivities";
import Admin from "./pages/Admin/Admin";
import ContactUs from "./pages/ContactUs/ContactUs";
import Providers from "./router/Providers";

function App() {
    return (
        <Providers>
            <ReactNotifications className="react-notifications" />
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path={route.home} element={<Home />} />
                        <Route path={route.details} element={<Details />} />
                        <Route path={route.build} element={<BuildActivity />} />
                        <Route path={route.activity} element={<Activity />} />
                    </Route>
                    <Route path={route.privacyPolicy} element={<PrivacyPolicy />} />
                    <Route path={route.content} element={<Content />} />
                    <Route path={route.myactivities} element={<SavedActivities />} />
                    <Route path={route.savedActivity} element={<SaveActivity />} />

                    <Route path={route.popularActivities} element={<PopularActivities />} />
                    <Route path={route.contentActivities} element={<ContentActivities />} />
                    <Route path={route.contentActivity} element={<ContentActivity />} />
                    <Route path={route.contactUs} element={<ContactUs />} />
                    <Route path={route.all} element={<Navigate replace to={route.home} />} />
                    <Route path={route.admin} element={<Admin />} />
                </Routes>
            </Router>
        </Providers>
    );
}
export default App;
