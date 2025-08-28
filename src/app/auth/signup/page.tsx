"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSignUpMutation } from "@/app/api/auth/query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const router = useRouter();
  const signUpMutation = useSignUpMutation();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      toast.error("Passwords field can't be empty");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords must match");
      return;
    }

    const defaultName = email.split("@")[0] || "New User";

    signUpMutation.mutate(
      { name: defaultName, email, password },
      {
        onSuccess: (data) => {
          if (!data.error) {
            router.push("/auth/login");
          }
        },
      }
    );
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
          <div>
            <div className="relative flex items-center justify-between">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-grow border-gray-300 focus:border-green-500 focus:ring-green-500"
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

            <div className="relative flex items-center justify-between mt-4">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              {showConfirmPassword ? (
                <FaRegEye
                  onClick={() => setShowConfirmPassword(false)}
                  className="absolute right-3 text-gray-500 cursor-pointer"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowConfirmPassword(true)}
                  className="absolute right-3 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-md font-semibold text-white
                       bg-gradient-to-r from-green-800 to-green-600
                       hover:from-green-700 hover:to-green-500
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                       transition-all duration-200 ease-in-out"
            disabled={signUpMutation.isPending}
          >
            {signUpMutation.isPending ? "Signing up..." : "Signup"}
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
