"use client";
import React from "react";
import { Search, Bell, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavbarProps {
  title: string;
  description?: string;
}

export default function Navbar({ title, description }: Readonly<NavbarProps>) {
  const router = useRouter();
  return (
    <header className="w-full mb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 text-sm md:text-base">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center justify-center h-12 w-40 md:w-64 lg:w-80">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 w-full bg-white text-gray-900 text-base shadow-sm h-12"
                disabled
              />
            </div>
          </div>

          <div className="flex items-center justify-center h-10">
            <Button
              className="bg-green-700 hover:bg-green-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
              onClick={() => router.push("/add-business")}
            >
              <Plus className="w-4 h-4" /> Add Business
            </Button>
          </div>

          <div className="flex items-center justify-center h-10 w-10">
            <Bell className="w-7 h-7 md:w-8 md:h-8 text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>

          <div className="flex items-center justify-center h-11 w-11">
            <Image
              src="/user-avatar.png"
              alt="User Avatar"
              width={44}
              height={44}
              className="rounded-full border-2 border-white shadow object-cover w-10 h-10 md:w-11 md:h-11"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
