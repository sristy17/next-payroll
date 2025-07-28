"use client";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <SearchX size={64} strokeWidth={2.2} className="mb-6 text-yellow-500 drop-shadow" />
      <div className="text-center">
        <h1 className="text-gray-900 font-bold text-2xl md:text-3xl mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 text-base mb-8 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved. Double-check the URL or return to the dashboard.
        </p>
        <Button
          className="w-full max-w-xs rounded-xl font-semibold text-white text-base shadow-md"
          style={{
            background: 'linear-gradient(90deg, #2B9348 0%, #00543C 100%)',
            height: 44,
            boxShadow: '0 2px 8px 0 rgba(0,127,95,0.10)'
          }}
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
} 