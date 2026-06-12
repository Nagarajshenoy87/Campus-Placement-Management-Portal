import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Drives from "./pages/Drives";
import Applications from "./pages/Applications";
import MyApplications from "./pages/MyApplications";
import AddCompany from "./pages/AddCompany";
import AddDrive from "./pages/AddDrive";
import DriveManagement from "./pages/DriveManagement";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/drives"
          element={
            <ProtectedRoute>
              <Drives />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <AdminRoute>
              <Applications />
            </AdminRoute>
          }
        />

        <Route
          path="/add-company"
          element={
            <AdminRoute>
              <AddCompany />
            </AdminRoute>
          }
        />

        <Route
          path="/add-drive"
          element={
            <AdminRoute>
              <AddDrive />
            </AdminRoute>
          }
        />
        <Route
          path="/drive-management"
          element={
            <AdminRoute>
              <DriveManagement />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;