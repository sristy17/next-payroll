"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithOAuth } from "@/app/api/auth/auth"; // Import updated functions

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handles the user login process using email and password.
   * @param {React.FormEvent} e - The form event.
   */
  const handleEmailPasswordLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const { user, error } = await signInWithEmailAndPassword(email, password);

    if (error) {
      toast.error(
        error.message ||
          "Invalid credentials. Please check your email and password.",
        {
          id: "login-error",
        }
      );
    } else if (user) {
      toast.success("Login successful!", {
        id: "login-success",
      });
      router.push("/dashboard");
    }
    setLoading(false);
  };

  /**
   * Handles the Google login process.
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { data, error } = await signInWithOAuth('google');

    if (error) {
      toast.error(error.message || "Error signing in with Google.", {
        id: "google-login-error",
      });
      setLoading(false);
    } else if (data) {
        // Google login initiates a redirect, no need for further action here
        // The callback page will handle the session
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-800">
      {" "}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg relative z-10">
          {" "}
          <div className="flex flex-col items-center mb-6">
            <Image
              src={"/logo.png"}
              alt="Next Pay Logo"
              width={120}
              height={40}
              priority
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Getting Started
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Welcome back to Next Pay - Login to your account
            </p>
          </div>
          <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <Link
                  href="/forgotpassword"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
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
                className="border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
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
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Or continue with
          </div>

          {/* Google Login Button */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full py-2 rounded-md font-semibold mt-4
                       bg-blue-800 hover:bg-blue-900 text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50
                       transition-all duration-200 ease-in-out flex items-center justify-center gap-2"
            disabled={loading}
          >
             <Image src="/google-icon.png" alt="Google Icon" width={20} height={20} />
            Sign in with Google
          </Button>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Do not have an Account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
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
