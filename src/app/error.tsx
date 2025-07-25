"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <AlertTriangle size={64} strokeWidth={2.2} className="mb-6 text-red-500 drop-shadow" />
      <div className="text-center">
        <h1 className="text-gray-900 font-bold text-2xl md:text-3xl mb-2">Oops! Something went wrong.</h1>
        <p className="text-gray-600 text-base mb-8 max-w-md">
          We encountered an unexpected error while processing your request. This could be due to a temporary server issue or a problem with your internet connection.<br />
          Please try again, or contact support if the problem persists.
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