"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { signIn } from "@/app/api/auth/auth";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { user, error } = await signIn(email, password);

    if (error) {
      toast.error(
        error.message ||
          "Invalid credentials. Please check your email and password.",
        { id: "login-error" }
      );
    } else if (user) {
      toast.success("Login successful!", { id: "login-success" });
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative z-10">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/logo.png"
              alt="Next Pay Logo"
              width={120}
              height={40}
              priority
            />
            <h1 className="text-3xl font-bold text-gray-900">Getting Started</h1>
            <p className="text-gray-600 text-sm">
              Welcome back to Next Pay - Login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgotpassword"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-2 rounded-md font-semibold text-white
                         bg-gradient-to-r from-green-800 to-green-600
                         hover:from-green-700 hover:to-green-500
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                         transition-all duration-200 ease-in-out flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-green-900 to-black rounded-l-3xl p-8 items-center justify-center relative overflow-hidden">
        <div className="text-white text-center md:text-left">
          <h1 className="font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight">
            Enter
            <span className="block">the Future</span>
            <span className="block">of Payments,</span>
            <span className="block">today</span>
          </h1>
        </div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-green-700 opacity-20 blur-3xl"></div>
        <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-green-500 opacity-15 blur-3xl"></div>
      </div>
    </div>
  );
}
