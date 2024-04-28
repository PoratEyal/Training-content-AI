import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import Details from "./pages/Details/Detailss";
import ChoosePath from "./pages/ChoosePath/ChoosePaths";
import Activity from "./pages/Activity/Activitys";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicys";
import PrivateRoutes from "./components/PrivateRoutes";
import { ErrorContextProvider } from "./context/ErrorContext";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
// import Maintenance from "./pages/Maintenance/maintenance";

function App() {
    return (
        <ErrorContextProvider>
            <ContentProvider>
                <ReactNotifications />
                <Router>
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route path="/" element={<Details />} />
                            <Route path="/choosePath" element={<ChoosePath />} />
                            <Route path="/activity" element={<Activity />} />
                        </Route>

                        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                        {/* <Route path="/" element={<Maintenance />} /> */}
                        <Route path={"*"} element={<Navigate replace to="/" />} />
                    </Routes>
                </Router>
            </ContentProvider>
        </ErrorContextProvider>
    );
}

export default App;
