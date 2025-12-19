// src/app/services/authService.ts
import { api } from "./api";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const res = await api.post("/auths/sign-in/email", payload);
  return res.data;
};
