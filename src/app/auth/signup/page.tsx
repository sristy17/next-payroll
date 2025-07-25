"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUp } from "@/app/api/auth/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }

    const displayName = name || email.split("@")[0];

    const { user, error } = await signUp(displayName, email, password);

    if (error) {
      toast.error(Could not sign-up: ${error.message}, {
        id: "sign-up",
      });
    } else if (user) {
      toast.success("Sign-up Success", {
        id: "sign-up",
      });
      router.push("/auth/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white">
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
        <p className="text-gray-600 mb-6 text-sm text-center">
          Welcome to Next Pay, let&apos;s create your account
        </p>
        <form onSubmit={handleSignUp} className="space-y-4">
          <Input
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-300 focus:border-green-500 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-2/4 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="text-right mt-2">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 rounded-xl font-semibold text-white
              bg-gradient-to-r from-green-700 to-green-500
              hover:from-green-600 hover:to-green-400
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
              transition-all duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Signing up...</span>
              </div>
            ) : (
              "Signup"
            )}
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
