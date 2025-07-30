"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signup } from "@/app/api/auth/auth"; // FIXED import
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const defaultName = email.split("@")[0] || "New User";

    // Basic password validation
    if (password.length < 8 || !/\d/.test(password)) {
      toast.error("Password must be at least 8 characters and contain at least one number.");
      return;
    }

    setLoading(true);

    const { data: user, error } = await signup(defaultName, email, password);

    if (error) {
      toast.error(`Could not sign-up: ${error}`);
    } else if (user) {
      toast.success("Sign-up Success");
      router.push("/auth/login");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-sm p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={"/logo.png"}
            alt="Next Pay Logo"
            width={120}
            height={40}
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Welcome to Next Pay, let&apos;s create your account
        </p>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="relative flex items-center">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
            {showPassword ? (
              <FaRegEye
                onClick={() => setShowPassword(false)}
                className="absolute right-3 text-gray-500 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPassword(true)}
                className="absolute right-3 text-gray-500 cursor-pointer"
              />
            )}
          </div>

          <div className="text-right mt-2">
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Forgot password?
            </Link>
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
        <p className="mt-6 text-center text-sm text-gray-600">
          Have an Account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
