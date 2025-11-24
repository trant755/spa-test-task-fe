import axiosBase from "./axiosBase";

export const login = async (credentials) => {
  const response = await axiosBase.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosBase.post("/auth/register", userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosBase.get("/auth/me");
  return response.data.user;
};

export const logout = () => {
  localStorage.removeItem("token");
};
