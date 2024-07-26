
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MovingUrl from "./pages/MovingUrl/MovingUrl";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovingUrl />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
