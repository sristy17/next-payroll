import { GiH2O } from "react-icons/gi";

export default function Signup() {
    return (
      <>
        <div className="flex h-screen">
          {/* Left Section */}
          <div className="w-1/2 flex items-center justify-center relative">
            <div className="absolute top-28 left-32 w-28 h-28 rounded-3 mb-5">
              <img src="/logo.png" alt="logo" />
            </div>
            <div className="absolute left-36 top-60">
              <h1 className="text-3xl font-bold">Getting Started</h1>
              <p className="text-gray-400">Welcome to Next Pay - Let's create your account</p>
              <div>
                <div className="absolute top-24">
                  <label htmlFor="email" className="text-md font-medium text-gray-100">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 bg-transparent w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="absolute top-44">
                  <label htmlFor="password" className="text-md font-medium text-gray-100">
                    Password
                  </label>
                  <a href="/forgotpassword" className="absolute top-0 left-60 ml-6 text-sm font-bold text-white">
                    Forgot?
                  </a>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 bg-transparent w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="absolute top-64 w-full py-2 px-4 bg-gradient-to-br from-green-700 to-black text-white font-semibold rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Sign Up
                </button>
                <p className="text-gray-400 absolute top-72 m-5">
                  Already have an Account?
                  <a href="/login" className="absolute top-0 ml-3 font-bold text-white">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
  
          {/* Right Section */}
          <div className="w-[45%] bg-gradient-to-br rounded-3xl m-2 from-green-800 to-black flex items-right justify-end absolute right-0 top-0 bottom-0">
            <div className="absolute top-16 left-10">
            <h1 className="font-extrabold text-white text-6xl">
              Enter 
             <span className="block">the Future</span>
             <span className="block"> of Payments,</span>
             <span className="block">today</span>
            </h1>
            </div>

            <div className="absolute top-72 left-80 bg-white w-72 h-80 rounded-3xl">
                <h2 className="font-extrabold text-black text-3xl top-20 left-10 absolute">
                    124,673.98$
                </h2>
                <p className="text-sm text-gray-400 absolute top-28 left-10 m-2">Combined Balance</p>
                <div className="absolute top-40 left-10">
                    <h2 className="font-bold text-black text-2xl"></h2>
                </div>
            </div>

          </div>
        </div>
      </>
    );
}
