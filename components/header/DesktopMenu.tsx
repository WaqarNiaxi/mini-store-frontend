// src/components/header/DesktopMenu.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MENU_ITEMS } from "./MenuItems";
import { useUserStore } from "@/app/store/userStore";
import { Button } from "@/components/ui/button";

export default function DesktopMenu() {
  const pathname = usePathname();
  const { user, logout } = useUserStore();
  const router = useRouter();

  const handleLoginLogout = () => {
    if (user) logout();
    else router.push("/login");
  };

  return (
    <nav className="hidden md:flex gap-8 items-center">
      {MENU_ITEMS.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition ${
              isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      {/* Login / Logout Button */}
      <Button variant="outline" className="ml-auto" onClick={handleLoginLogout}>
        {user ? "Logout" : "Login"}
      </Button>
    </nav>
  );
}
