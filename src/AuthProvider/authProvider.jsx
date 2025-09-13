import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const AuthContext = createContext();

const fetchProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const AuthProvider = ({ children }) => {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    retry: 1,
    refetchOnWindowFocus: false, // prevent refetch on tab switch
  });

  const value = {
    user,
    isLoading,
    isError,
  };

  // Prevent rendering children until user data is ready
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Failed to load user data.</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
