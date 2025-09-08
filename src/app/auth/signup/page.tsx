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
import { SignUpResponse, ApiError } from "@/app/api/auth/types";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const signUpMutation = useSignUpMutation();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
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
        onSuccess: (data: SignUpResponse) => {
            if(!data.error){
            toast.success("Signup successful!");

            router.push("/auth/login");
            }
     
        },
        onError: (err: ApiError) => {
          console.error("Signup mutation error:", err);
          toast.error(err?.message || "Signup failed");
        },
      }
    );
  };

  return (
  <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative z-10">
          <div className="flex flex-col items-center mb-6"></div>
        <div className="flex flex-col items-center">
          <Image src={"/logo.png"} alt="Next Pay Logo" width={120} height={40} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900  text-center">Get Started</h1>
        <p className="text-gray-600 mb-6 text-sm text-center">
  Welcome to Next Pay, let&apos;s create your account
        </p>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
           <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 "
              >
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
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
          </div>
          <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 "
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
            {showPassword ? (
              <FaRegEye
                onClick={() => setShowPassword(false)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPassword(true)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              />
            )}
          </div>
            </div>
            <div>
          <Label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
            {showConfirmPassword ? (
              <FaRegEye
                onClick={() => setShowConfirmPassword(false)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowConfirmPassword(true)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              />


            )}
          </div>
          </div>
          <Button type="submit"   className="w-full py-2 rounded-md font-semibold text-white
                         bg-gradient-to-r from-green-800 to-green-600
                         hover:from-green-700 hover:to-green-500
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                         transition-all duration-200 ease-in-out" disabled={signUpMutation.isPending}>
            {signUpMutation.isPending ? "Signing up..." : "Signup"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link href="/auth/login" className="font-semibold text-blue-600 hover:underline">Login</Link>
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
