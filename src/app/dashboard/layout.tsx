// src/app/dashboard/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  LayoutDashboard,
  Wallet,
  FileText,
  HelpCircle,
  Settings,
  Search,
  Plus,
  Bell,
} from "lucide-react";

import { getSession, signOut } from "@/app/api/auth/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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

  const [username, setUserName] = useState<string | undefined>(undefined);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const { session, error } = await getSession();
      if (session && error === null) {
        setUserName(session.name);
        setUserEmail(session.email);
      }
    }
    fetchSession();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-[250px] bg-gradient-to-br from-green-900 to-black m-2 rounded-3xl flex flex-col p-6 sticky top-2 bottom-2 self-start max-h-[calc(100vh-1rem)] overflow-y-auto">
        <div className="flex items-center mb-10 mt-2 gap-3">
          <Image
            src={"/logo.png"}
            alt="Next Pay Logo"
            width={40}
            height={40}
            priority
            className="shrink-0"
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
                    ? "text-green-900"
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
              <p className="text-white font-semibold">{username}</p>
              <p className="text-gray-400 text-sm">{userEmail}</p>
            </div>
          </div>
          {userEmail && username ? (
            <Button
              className="w-full mt-4 bg-green-700 text-white"
              onClick={async () => {
                await signOut();
                router.push("/auth/login");
              }}
            >
              Logout
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="relative flex items-center w-80">
            <Search className="absolute left-3 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button className="bg-green-700 hover:bg-green-600 text-white rounded-lg px-4 py-2 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Business
            </Button>
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
            <div className="flex items-center cursor-pointer">
              <Image
                src="/user-avatar.png"
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
