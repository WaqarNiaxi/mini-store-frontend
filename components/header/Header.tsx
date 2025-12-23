// src/components/header/Header.tsx
"use client";

import Image from "next/image";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <Image
  src="/download.png"
  alt="Download"
  width={100}
  height={100}
/>
        </Link>

        {/* Desktop Menu */}
        <DesktopMenu />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
