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

export default function Dashboard() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add Payment", href: "/addpayment", icon: Wallet },
    { name: "ITR-1 (Sahaj)", href: "/itr1", icon: FileText },
    { name: "ITR-4 (Sugam)", href: "/itr4", icon: FileText },
    { name: "GST Return Filing", href: "/gst-return", icon: FileText },
    { name: "Help", href: "/help", icon: HelpCircle },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-[250px] bg-gradient-to-br from-green-900 to-black m-2 rounded-3xl flex flex-col p-6 sticky top-2 bottom-2 self-start max-h-[calc(100vh-1rem)] overflow-y-auto">
      <div className="flex items-center mb-10 mt-2">
        <Image
          src={"/logo.png"}
          alt="Next Pay Logo"
          width={40}
          height={40}
          priority
          className="mr-3"
        />
        <span className="font-bold text-2xl text-white">Next Pay</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-lg text-white font-medium transition-colors duration-200
              ${
                isActive(item.href)
                  ? "bg-white text-green-900"
                  : "hover:bg-green-800/50"
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-green-800">
        <div className="flex items-center space-x-3 p-3">
          <Image
            src="/user-avatar.png"
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white font-semibold">Bisler Pandey</p>
            <p className="text-gray-400 text-sm">bisler.pandey@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
