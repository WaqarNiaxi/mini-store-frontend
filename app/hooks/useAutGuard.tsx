// src/hooks/useAuthGuard.ts
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isPending, isAuthenticated, router]);

  return {
    isPending,
    isAuthenticated,
  };
}
