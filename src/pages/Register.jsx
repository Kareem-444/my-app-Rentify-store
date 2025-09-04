import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLoginButtons from "../components/SocialLoginButtons";

function getPasswordStrength(password) {
  if (!password) return "";
  if (password.length < 6) return "Weak";
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8)
    return "Strong";
  if (password.length >= 6) return "Medium";
  return "Weak";
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Full Name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Invalid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (!form.confirm) errs.confirm = "Please confirm your password";
    else if (form.password !== form.confirm)
      errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordStrength(getPasswordStrength(value));
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
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/profile"), 1200);
    }, 1200);
  };

  return (
    <main className="pt-28 min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <section className="w-full max-w-lg mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl px-8 py-12 border border-green-100 dark:border-gray-800 backdrop-blur-md transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-8 text-center tracking-tight drop-shadow-lg">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80] focus:outline-none transition"
              placeholder="Your Name"
            />
            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80] focus:outline-none transition"
              placeholder="you@email.com"
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80] focus:outline-none transition"
              placeholder="Password"
            />
            {passwordStrength && (
              <div className={`mt-1 text-xs font-bold ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-red-500'}`}>{passwordStrength} password</div>
            )}
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80] focus:outline-none transition"
              placeholder="Confirm Password"
            />
            {errors.confirm && <div className="text-red-500 text-sm mt-1">{errors.confirm}</div>}
          </div>
          {success && <div className="text-green-600 font-semibold text-center">{success}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4ade80] text-[#004d40] font-bold py-3 rounded-xl shadow-lg hover:bg-[#22c55e] hover:text-white transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] mt-2 disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <SocialLoginButtons loading={loading} />
        <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <span
            className="text-[#4ade80] underline hover:text-green-700 dark:hover:text-green-300 cursor-pointer font-semibold"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;