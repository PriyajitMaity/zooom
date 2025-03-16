"use client";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            height={36}
            width={36}
            alt="hamburger icons"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>

        <SheetContent className="border-none bg-[#1c1f2e] text-white">
          <SheetHeader>
            <SheetTitle>
              <Link href={"/"} className="flex items-center gap-1">
                <Image src="/icons/logo.svg" alt="zoom logo" height={32} width={32} className="max-sm:size-10" />
                <p className="text-[26px] ml-4 font-extrabold text-white">ZOOM</p>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]">
            <SheetClose asChild>
              <section className="flex flex-col h-full gap-6 pt-16">
                {sidebarLinks.map((item) => {
                  const isActive = pathName === item.route;
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn("flex gap-4 items-center p-4 rounded-lg w-full max-w-60", {
                          "bg-[#0e78f9]": isActive,
                        })}
                      >
                        <Image src={item.imgURL} alt={item.label} width={20} height={20} />
                        <p className="font-semibold ">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
