"use client";

import { useState, useEffect } from "react";
import { getSession, getUser } from "@/app/api/auth/provider";
import { Button } from "@/components/ui/button";

export default function AuthDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    
    // Check localStorage
    const localStorageData = {
      user_id: typeof window !== "undefined" ? localStorage.getItem("user_id") : null,
      user_email: typeof window !== "undefined" ? localStorage.getItem("user_email") : null,
    };

    // Check session
    const sessionResult = await getSession();
    
    // Check user
    const userResult = await getUser();

    setDebugInfo({
      localStorage: localStorageData,
      session: sessionResult,
      user: userResult,
      timestamp: new Date().toISOString(),
    });
    
    setLoading(false);
  };

  const clearStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");
      checkAuthStatus();
    }
  };

  if (loading) {
    return <div>Loading debug info...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug Page</h1>
      
      <div className="space-y-4">
        <Button onClick={checkAuthStatus} className="mr-4">
          Refresh Debug Info
        </Button>
        
        <Button onClick={clearStorage} variant="outline">
          Clear LocalStorage
        </Button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Debug Information:</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Authentication Status:</h2>
        <div className="space-y-2">
          <p><strong>Has User ID in localStorage:</strong> {debugInfo.localStorage?.user_id ? "✅ Yes" : "❌ No"}</p>
          <p><strong>Has Email in localStorage:</strong> {debugInfo.localStorage?.user_email ? "✅ Yes" : "❌ No"}</p>
          <p><strong>Session Valid:</strong> {debugInfo.session?.session ? "✅ Yes" : "❌ No"}</p>
          <p><strong>User Found in DB:</strong> {debugInfo.user?.user ? "✅ Yes" : "❌ No"}</p>
          <p><strong>Session Error:</strong> {debugInfo.session?.error?.message || "None"}</p>
          <p><strong>User Error:</strong> {debugInfo.user?.error?.message || "None"}</p>
        </div>
      </div>
    </div>
  );
}