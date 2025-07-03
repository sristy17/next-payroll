"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast"; // Import toast
import { signUp } from "@/app/api/auth/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Removed `error` and `message` states, as toast handles messages

  const [loading, setLoading] = useState(false);

  /**
   * Handles the user registration process using the signUp API.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { user, error: authError } = await signUp(email, password);

    if (authError) {
      toast.error(`Signup failed: ${authError.message}`);
    } else if (user) {
      toast.success("Account created successfully. Please Login.");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center relative">
        <div className="absolute top-28 left-32 w-28 h-28 rounded-3 mb-5">
          <Image src={"/logo.png"} width="64" height="64" alt="logo" />
        </div>
        <div className="absolute left-36 top-60">
          <h1 className="text-3xl font-bold">Join Next Pay</h1>
          <p className="text-gray-400">Create your new account</p>
          <div>
            <form onSubmit={handleSignup}>
              <div className="absolute top-24">
                <label
                  htmlFor="email"
                  className="text-md font-medium text-gray-100"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-transparent w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your email"
                />
              </div>

              <div className="absolute top-44">
                <label
                  htmlFor="password"
                  className="text-md font-medium text-gray-100"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 bg-transparent w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Choose a strong password"
                />
              </div>

              <button
                type="submit"
                className="absolute top-64 w-full py-2 px-4 bg-gradient-to-br from-green-700 to-black text-white font-semibold rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {/* Removed the static error/message <p> tags */}
            {/* {error && <p className="text-red-500 absolute top-72">{error}</p>}
            {message && <p className="text-green-500 absolute top-72">{message}</p>} */}

            <p className="text-gray-400 absolute top-72 m-5">
              Already have an Account?
              <Link
                href="/auth/login"
                className="absolute top-0 ml-3 font-bold text-white"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[45%] bg-gradient-to-br rounded-3xl m-2 from-green-900 to-black flex items-right justify-end absolute right-0 top-0 bottom-0">
        <div className="absolute top-16 left-10">
          <h1 className="font-extrabold text-white text-6xl">
            Enter
            <span className="block">the Future</span>
            <span className="block"> of Payments,</span>
            <span className="block">today</span>
          </h1>
        </div>

        <div className="absolute top-80 left-96 mt-10 w-48 h-48 rounded-3 mb-5">
          <Image src={"/logo.png"} width="64" height="64" alt="logo" />
        </div>
      </div>
    </div>
  );
}
