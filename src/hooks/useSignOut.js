// hooks/useSignOut.js
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function useSignOut() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await api.post("/auth/signout");
      localStorage.removeItem("token");
      toast.success("SignOut Successful");
      navigate("/auth/signin", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to sign out");
    }
  };

  return handleSignOut;
}
