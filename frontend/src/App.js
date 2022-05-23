import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/auth/login";
import AdminHome from "./pages/admin_home/admin_home";
import ProtectedRoute from "./components/protected_route";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <div>comming soon</div>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
