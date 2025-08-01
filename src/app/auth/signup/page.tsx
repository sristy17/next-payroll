"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUpWithEmailAndPassword } from "@/app/api/auth/auth"; // Import updated function
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const defaultName = email.split("@")[0] || "New User"; // You might want to add a name input field

    const { user, error } = await signUpWithEmailAndPassword(email, password, {
        data: { name: defaultName } // Pass name in options.data
    });

    if (error) {
      toast.error(`Could not sign-up: ${error.message}`, {
        id: "sign-up",
      });
    } else if (user) {
      toast.success("Sign-up Success! Please check your email to verify your account.", {
        id: "sign-up",
      });
      // Supabase sends a verification email on signup
      // You might want to redirect to a confirmation message page
      router.push("/auth/login"); // Redirect to login after signup
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-sm p-8 rounded-lg shadow-lg bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={"/logo.png"}
            alt="Next Pay Logo"
            width={120}
            height={40}
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Get Started</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
          Welcome to Next Pay, let&apos;s create your account
        </p>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative flex items-center">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-grow border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
               <span
                className="absolute right-3 cursor-pointer text-gray-500 dark:text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            {/* Removed duplicate password input */}
            <div className="text-right mt-2">
              {/* Consider adding a forgot password link if applicable */}
            </div>
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
            {loading ? "Signing up..." : "Signup"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Have an Account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
