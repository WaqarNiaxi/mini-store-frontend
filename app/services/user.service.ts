import { api } from "./api";

export type userType = {
  id: string;
  name: string;
  email: string;
};

export type UserProfileType = userType & {
  wallet: { balance: string };
};

export async function fetchUserProfile(): Promise<UserProfileType> {
  const res = await api.get(`/users/profile`);
  return res.data;
}

export async function fetchUserList(): Promise<userType[]> {
  const res = await api.get("/users/allUser");
  return res.data;
}
