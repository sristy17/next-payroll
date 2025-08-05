"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { signIn, signInWithGoogle } from "@/app/api/auth/auth";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, error } = await signIn(email, password);
      if (error) throw error;
      
      toast.success(`Welcome back, ${user?.user_metadata.full_name}!`);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { user, error } = await signInWithGoogle();
      if (error) throw error;
      
      toast.success(`Google login successful as ${user?.user_metadata.full_name}!`);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg relative z-10 border border-border dark:border-gray-700">
          {/* Theme toggle */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
            <Switch
              id="theme-toggle"
              checked={theme === "dark"}
              onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
            />
          </div>
          
          {/* Logo and header */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/Group 4.png"
              alt="Next Pay Logo"
              width={120}
              height={40}
              priority
              className="mb-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
            />
            <h1 className="text-3xl font-bold text-foreground">
              Getting Started
            </h1>
            <p className="text-muted-foreground text-sm">
              Welcome back to Next Pay - Login to your account
            </p>
          </div>
          
          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="mb-1">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgotpassword"
                  className="text-sm font-medium text-green-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full py-2 rounded-md font-semibold text-white
                         bg-gradient-to-r from-green-800 to-green-600
                         hover:from-green-700 hover:to-green-500
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                         transition-all duration-200 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging In...
                </span>
              ) : "Log In"}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                <>
                  <Image
                    src="/google.jpg"
                    alt="Google Logo"
                    width={20}
                    height={20}
                  />
                  <span>Google</span>
                </>
              )}
            </Button>
          </form>
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an Account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-green-600 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right side - Marketing banner */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-green-900 to-black rounded-l-3xl p-8 items-center justify-center relative overflow-hidden">
        <div className="text-white text-center md:text-left">
          <h1 className="font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight">
            Enter
            <span className="block">the Future</span>
            <span className="block"> of Payments,</span>
            <span className="block">today</span>
          </h1>
        </div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-green-700 opacity-20 filter blur-3xl"></div>
        <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-green-500 opacity-15 filter blur-3xl"></div>
      </div>
    </div>
  );
}