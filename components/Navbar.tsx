import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed flex flex-between z-50 w-full bg-[#1c1f2e] px-6 py-4 lg:px-10">
      <Link href={"/"} className="flex items-center gap-1">
        <Image src="/icons/logo.svg" alt="zoom logo" height={32} width={32} className="max-sm:size-10" />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">ZOOM</p>
      </Link>
      <div className="flex-between gap-5">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
