import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const student = JSON.parse(
    localStorage.getItem("student")
  );

  if (!student || student.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;