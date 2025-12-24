"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MENU_ITEMS } from "./MenuItems";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { queryClient } from "@/app/providers";

export default function DesktopMenu() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLoginLogout = async () => {
    if (user) {
      await signOut();
      queryClient.removeQueries({ queryKey: ["userList"] });
      queryClient.removeQueries({ queryKey: ["creditTransaction"] });
      queryClient.removeQueries({ queryKey: ["gifts"] });
      queryClient.removeQueries({ queryKey: ["order"] });
      queryClient.removeQueries({ queryKey: ["wallet"] });

      router.replace("/login");
    } else {
      router.push("/login");
    }
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
      <Button
        variant="outline"
        className="ml-auto"
        onClick={handleLoginLogout}
        disabled={isPending}
      >
        {user ? "Logout" : "Login"}
      </Button>
    </nav>
  );
}
