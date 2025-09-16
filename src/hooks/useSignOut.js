// hooks/useSignOut.js
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function useSignOut() {
  const navigate = useNavigate();
  const {setUser} = useAuth()

  const handleSignOut = async () => {
    try {
      await api.post("/auth/signout"); 
      setUser(null)
      toast.success("SignOut Successful");
      navigate("/auth/signin", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to sign out");
    }
  };

  return handleSignOut;
}
