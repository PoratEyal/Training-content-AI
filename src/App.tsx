import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Details from "./pages/Details/Details";
import ChoosePath from "./pages/ChoosePath/ChoosePath";
import Activity from "./pages/Activity/Activity";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import PrivateRoutes from "./router/PrivateRoutes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Home from "./pages/Home/Home";
import route from "./router/route.json";
import "./App.css";
import ContantUs from "./pages/ContantUs/ContantUs";
import Providers from "./context/providers";

function App() {
    return (
        <Providers>
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
                    <Route path={route.contactUs} element={<ContantUs />} />
                    <Route path={route.all} element={<Navigate replace to={route.home} />} />
                </Routes>
            </Router>
        </Providers>
    );
}

export default App;
