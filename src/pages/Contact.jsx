
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }
    setSuccess("Thank you for contacting us! We'll get back to you soon.");
    setError("");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="pt-28 min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <section className="w-full max-w-lg mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl px-8 py-12 border border-green-100 dark:border-gray-800 backdrop-blur-md transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-green-700 dark:text-green-400 mb-8 text-center tracking-tight drop-shadow-lg">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80] focus:outline-none transition"
              placeholder="Your Name"
            />
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
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80] focus:outline-none transition min-h-[120px]"
              placeholder="How can we help you?"
            />
          </div>
          {error && <div className="text-red-500 font-semibold text-center">{error}</div>}
          {success && <div className="text-green-600 font-semibold text-center">{success}</div>}
          <button
            type="submit"
            className="w-full bg-[#4ade80] text-[#004d40] font-bold py-3 rounded-xl shadow-lg hover:bg-[#22c55e] hover:text-white transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] mt-2"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;