// app/(protected)/layout.tsx
"use client";

import { useAuthGuard } from "@/app/hooks/useAutGuard";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending, isAuthenticated } = useAuthGuard();

  // Block rendering completely
  if (isPending || !isAuthenticated) {
    return null; // or full-screen loader
  }

  return <>{children}</>;
}
