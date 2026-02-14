import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Agents from "./pages/Agents";

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="*" element={<Navigate to="/login" />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard page */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Agents page */}
      <Route
        path="/agents"
        element={
          <ProtectedRoute>
            <Agents />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
