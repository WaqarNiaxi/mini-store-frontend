"use client";

import { useAuthGuard } from "@/app/hooks/useAutGuard";
import { Loader } from "@/components/common/loader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending, isAuthenticated } = useAuthGuard();

  // Block rendering completely
  if (isPending || !isAuthenticated) {
    return <Loader/>;
  }

  return <>{children}</>;
}
