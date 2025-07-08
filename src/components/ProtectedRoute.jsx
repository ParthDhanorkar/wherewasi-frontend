
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // if not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // if logged in, render the child component
  return children;
}

export default ProtectedRoute;
