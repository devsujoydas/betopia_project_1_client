// hooks/useDeleteAccount.js
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function useDeleteAccount() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const res = await api.delete("/users/account-delete");

      // 🟢 Clear context + localStorage
      setUser(null);
      localStorage.removeItem("user");

      toast.success(res.data.message || "Account deleted successfully");
      navigate("/auth/signin", { replace: true });
    } catch (err) {
      console.error("Account delete error:", err);
      toast.error(err?.response?.data?.message || "Failed to delete account");
    }
  };

  return handleDeleteAccount;
}
