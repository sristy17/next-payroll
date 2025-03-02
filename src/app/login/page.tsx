"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import logo from '../../../public/logo.png';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data: user, error: fetchError } = await supabase
      .from("User")
      .select("email, password")
      .eq("email", email)
      .single();

    if (fetchError || !user) {
      setError("User not found. Please confirm your email or sign up.");
      return;
    }

     // Authenticate user using Supabase auth
     const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid credentials. Please confirm your email and try again.");
      return;
    }
    router.push("/dashboard");
  };

    return (
      <>
        <div className="flex h-screen">
          {/* Left Section */}
          <div className="w-1/2 flex items-center justify-center relative">
          <div className="absolute top-28 left-32 w-28 h-28 rounded-3 mb-5">
              <Image src={logo} alt="logo" />
          </div>
        </div>
        <div className="absolute left-36 top-60">
          <h1 className="text-3xl font-bold">Getting Started</h1>
          <p className="text-gray-400">Welcome back to Next Pay - Login to your account</p>
          <div>
            <form onSubmit={handleLogin}>
              <div className="absolute top-24">
                  <label htmlFor="email" className="text-md font-medium text-gray-100">
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
                <label htmlFor="password" className="text-md font-medium text-gray-100">
                  Password
                </label>
                <Link href="/forgotpassword" className="absolute top-0 left-60 ml-6 text-sm font-bold text-white">
                  Forgot?
                </Link>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 bg-transparent w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="absolute top-64 w-full py-2 px-4 bg-gradient-to-br from-green-700 to-black text-white font-semibold rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Log In
              </button>
            </form>

            {error && <p className="text-red-500 absolute top-72">{error}</p>}

            <p className="text-gray-400 absolute top-72 m-5">
              Do not have an Account?
              <Link href="/signup" className="absolute top-0 ml-3 font-bold text-white">
                Signup
              </Link>
            </p>
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
            <Image src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
}
