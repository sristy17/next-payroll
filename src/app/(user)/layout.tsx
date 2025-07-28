"use client";
import Sidebar from "@/components/Sidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}