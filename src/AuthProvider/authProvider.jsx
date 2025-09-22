// frontend/src/AuthProvider/AuthProvider.jsx
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
  // 🟢 First load from localStorage if exists
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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

  // 🟢 Whenever API gives new data, update state + localStorage
  useEffect(() => {
    if (data !== undefined) {
      setUser(data);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        localStorage.removeItem("user"); // clear if null
      }
    }
  }, [data]);

  // 🟢 Keep localStorage synced if setUser is called manually
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const value = { user, setUser, isLoading, isError, isFetching };

  if (isFetching && !user) {
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
