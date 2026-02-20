"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { MENU_ITEMS } from "./MenuItems";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { queryClient } from "@/app/providers";
import { useSession, signOut } from "@/lib/auth-client";


export default function MobileMenu() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

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

          <Button variant="outline" onClick={handleLoginLogout} disabled={isPending}>
            {user ? "Logout" : "Login"}
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
