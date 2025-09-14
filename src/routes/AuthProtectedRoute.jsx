import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function AuthProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
 
  if (user) return <Navigate to="/account" replace />;

  return children;
}
