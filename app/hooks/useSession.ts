"use client"


import { useEffect } from "react";
import { api } from "../services/api";
import { useUserStore } from "@/app/store/userStore";

export const useSession = () => {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    api
      .get("/auth/get-session")
      .then((res) => {
        setUser(res.data?.user ?? null);
      })
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);
};
