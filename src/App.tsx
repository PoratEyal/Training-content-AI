import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import Details from "./pages/details/details";
import ChoosePath from "./pages/choosePath/choosePath";
import Activity from "./pages/activity/activity";
import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicy";
import PrivateRoutes from "./components/PrivateRoutes";
import { ErrorContextProvider } from "./context/ErrorContext";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Maintenance from "./pages/maintenance/maintenance";

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
