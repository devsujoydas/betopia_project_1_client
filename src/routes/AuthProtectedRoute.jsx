import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function AuthProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  console.log(user);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }

  if (user) {
    if (user.profileCompleted) {
      return <Navigate to="/account" state={{ from: location }} replace />;
    }
    if (!user.profileCompleted) {
      return <Navigate to="/auth/complete-profile" replace />;
    }
  }

  return children;
}
