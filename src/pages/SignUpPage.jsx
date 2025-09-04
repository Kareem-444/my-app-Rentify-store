import React from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => (
  <div className="font-sans bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col justify-center items-center">
    <div className="bg-white rounded-2xl shadow-xl px-8 py-10 w-full max-w-md animate-fade-in">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Create Your Rentify Account</h2>
      <form className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-green-700">Email</label>
          <input type="email" id="email" name="email" required className="border border-gray-200 rounded-lg px-4 py-2 bg-green-50 focus:outline-none focus:ring-2 focus:ring-[#4ade80] text-base" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-green-700">Password</label>
          <input type="password" id="password" name="password" required className="border border-gray-200 rounded-lg px-4 py-2 bg-green-50 focus:outline-none focus:ring-2 focus:ring-[#4ade80] text-base" />
        </div>
        <button type="submit" className="bg-[#4ade80] text-green-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-green-400 hover:scale-105 transition flex items-center justify-center gap-2">
          Sign Up
        </button>
      </form>
      <div className="text-center text-gray-700 mb-4">Or sign up with</div>
      <div className="flex flex-col gap-3">
        {/* Social sign up buttons */}
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow hover:bg-[#4ade80] hover:text-green-900 transition font-medium">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" /> Google
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow hover:bg-[#4ade80] hover:text-green-900 transition font-medium">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="w-5 h-5" /> Facebook
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow hover:bg-[#4ade80] hover:text-green-900 transition font-medium">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/discord.svg" alt="Discord" className="w-5 h-5" style={{ filter: "invert(41%) sepia(99%) saturate(749%) hue-rotate(202deg) brightness(97%) contrast(101%)" }} /> Discord
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow hover:bg-[#4ade80] hover:text-green-900 transition font-medium">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5" /> GitHub
        </button>
      </div>
      <div className="mt-6 text-center text-gray-700">
        Already have an account? <Link to="/login" className="text-[#4ade80] underline hover:text-green-700 transition">Login</Link>
      </div>
    </div>
    {/* Footer can be a component */}
  </div>
);

export default SignUpPage;