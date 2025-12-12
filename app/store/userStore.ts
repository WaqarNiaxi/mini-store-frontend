// src/store/userStore.ts
import { create } from "zustand";

interface UserState {
  user: { email: string } | null;
  token: string;
  setUser: (user: { email: string }, token:string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: "",
  setUser: (user, token) => {
    set({ user, token });
    localStorage.setItem("token", token); // persist token
  },
  logout: () => set({ user: null,token: "" }),
}));
