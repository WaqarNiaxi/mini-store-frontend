"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // pages where header should NOT appear
  const hideHeaderRoutes = ["/register"];

  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
    </>
  );
}
