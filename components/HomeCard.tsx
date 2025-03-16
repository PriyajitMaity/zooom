'use client'
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface HomeCardProps {
  className?: string;
  img: string;
  description: string;
  title: string;
  handleClick?: () => void;
}

const HomeCard = ({ img, title, className, description, handleClick }: HomeCardProps) => {
  
  return (
    <section
      className={cn(
        "bg-[#ff742e] px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px] ">
        <Image src={img} alt="meeting" height={27} width={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-normal">{title}</h1>
        <p className="tetx-lg font-normal">{description}</p>
      </div>
    </section>
  );
};
export default HomeCard;
