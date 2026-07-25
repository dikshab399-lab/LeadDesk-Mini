import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LeadForm from "./pages/LeadForm";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lead" element={<LeadForm />} />
        <Route path="/admin" element={<Login />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
 />
      </Routes>
    </BrowserRouter>
  );
}

export default App;