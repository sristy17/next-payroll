export default function Signup() {
    return(
        <>
        <div className="w-auto h-auto">
            <div className="flex items-center justify-center absolute top-28 left-32 w-28 h-28 rounded-3 mb-5">
            <img src="/logo.png" alt="logo" />
            </div>
            <div className="absolute left-36 top-60">
            <h1 className="text-3xl font-bold ">Getting Started</h1>
            <p className="text-gray-400">Welcome to Next Pay - Lets's create your account</p>
            <div>
            <div className="absolute top-24">
            <label htmlFor="email" className="text-md m-2 font-medium text-gray-100">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your email"
              required
            />
          </div>
          <div className="absolute top-44">
            <label htmlFor="password" className="text-md m-2 font-medium text-gray-100">
              Password
            </label>
            <a href="/forgotpassword" className="absolute top-0 left-64 text-sm font-bold text-white">Forgot?</a>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 bg-transparent w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            <p className="text-gray-400 absolute top-72 m-5">Already have an Account? 
                <a href="/login" className="absolute top-0 ml-3 font-bold text-white"> Login</a>
            </p>
        </div>
        </div>
        </div>
        </>
    )
}