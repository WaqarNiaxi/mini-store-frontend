// src/components/header/MobileMenu.tsx
"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { MENU_ITEMS } from "./MenuItems";
import { useUserStore } from "@/app/store/userStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MobileMenu() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  const handleLoginLogout = () => {
    if (user) {
      logout();
    } else {
      router.push("/login");
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="w-6 h-6" />
      </SheetTrigger>

      <SheetContent side="left" className="p-6">
        <nav className="flex flex-col gap-6 mt-6">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}

          <Button variant="outline" onClick={handleLoginLogout}>
            {user ? "Logout" : "Login"}
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
