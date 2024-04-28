import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import Details from "./pages/Details/details";
import ChoosePath from "./pages/ChoosePath/choosePath";
import Activity from "./pages/Activity/activity";
import PrivacyPolicy from "./pages/PrivacyPolicy/privacyPolicy";
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
