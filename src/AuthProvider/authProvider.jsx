import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const AuthContext = createContext();

const fetchProfile = async () => {
  try {
    const { data } = await api.get("/users/profile");
    return data;
  } catch (err) {
    if (err.response?.status === 401) return null;
    throw err;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 5 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
 
  useEffect(() => {
    if (data !== undefined) {
      console.log(data)
      setUser(data);
    }
  }, [data]);

  const value = { user, setUser, isLoading, isError, isFetching };

  if (isFetching) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="h-10 w-10 border-y-2 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
