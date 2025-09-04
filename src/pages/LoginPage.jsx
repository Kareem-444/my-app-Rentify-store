
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialLoginButtons from '../components/SocialLoginButtons';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    if (!password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/profile"), 1200);
    }, 1200);
  };

  return (
    <main className="pt-28 min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <section className="w-full max-w-lg mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl px-8 py-12 border border-green-100 dark:border-gray-800 backdrop-blur-md transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-8 text-center tracking-tight drop-shadow-lg">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80] focus:outline-none transition"
              placeholder="you@email.com"
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80] focus:outline-none transition"
              placeholder="Password"
            />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((v) => !v)}
                className="rounded border-gray-300 focus:ring-[#4ade80]"
              />
              Remember me
            </label>
            <span className="text-[#4ade80] underline hover:text-green-700 dark:hover:text-green-300 cursor-pointer font-semibold text-sm" onClick={() => navigate("/register")}>Create account</span>
          </div>
          {success && <div className="text-green-600 font-semibold text-center">{success}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4ade80] text-[#004d40] font-bold py-3 rounded-xl shadow-lg hover:bg-[#22c55e] hover:text-white transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] mt-2 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <SocialLoginButtons loading={loading} />
      </section>
    </main>
  );
};


export default LoginPage;