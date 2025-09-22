// routes/AuthProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function AuthProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }


  if (user) {
    return <Navigate to="/auth/complete-profile" state={{ from: location }} replace />;
  }

  return children;
}
