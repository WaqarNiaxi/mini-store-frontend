"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import { useSession } from "./hooks/useSession";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // pages where header should NOT appear
  const hideHeaderRoutes = ["/register"];

  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  useSession();
  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
    </>
  );
}
