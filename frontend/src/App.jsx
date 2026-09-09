import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Analysis from "./pages/analysis";
import Roadmap from "./pages/roadmap";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/analysis"
                    element={<Analysis />}
                />

                <Route
                    path="/roadmap"
                    element={<Roadmap />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;