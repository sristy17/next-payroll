"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  LayoutDashboard,
  Wallet,
  FileText,
  HelpCircle,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add Payment", href: "/add-payment", icon: Wallet },
    { name: "ITR-1 (Sahaj)", href: "/itr1", icon: FileText },
    { name: "ITR-4 (Sugam)", href: "/itr4", icon: FileText },
    { name: "GST Return Filing", href: "/gst-return", icon: FileText },
    { name: "Help", href: "/help", icon: HelpCircle },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside
      className="flex-shrink-0 h-screen min-h-screen w-[250px] bg-gradient-to-br from-green-900 to-black m-2 rounded-3xl flex flex-col p-6 overflow-y-auto overflow-x-hidden"
      style={{ maxHeight: "100vh" }}
    >
      <div className="flex items-center mb-10 mt-2 w-full">
        <Image
          src={"/logo.png"}
          alt="Next Pay Logo"
          width={40}
          height={40}
          priority
          className="mr-3"
        />
        <span className="font-bold text-base md:text-2xl text-white truncate">
          Next Pay
        </span>
      </div>

      <nav className="flex-1 space-y-2 w-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors duration-200 w-full
              ${
                isActive(item.href)
                  ? "bg-white text-green-900"
                  : "text-white hover:bg-green-800/50"
              }
              text-sm md:text-base truncate
            `}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-green-800 w-full">
        <div className="flex items-center space-x-3 p-3 w-full">
          <Image
            src="/user-avatar.png"
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full border-2 border-white flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm md:text-base truncate">
              Bisler Pandey
            </p>
            <p className="text-gray-400 text-xs md:text-sm truncate">
              bisler.pandey@gmail.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}