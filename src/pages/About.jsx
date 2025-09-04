import React from "react";

const About = () => (
  <main className="pt-24 min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <section className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl px-6 py-10 mt-8 text-center">
      <img
        src="https://img.icons8.com/color/96/toolbox.png"
        alt="About Rentify"
        className="mx-auto mb-6"
      />
      <h2 className="text-3xl font-bold text-green-700 mb-4">About Rentify</h2>
      <p className="text-lg text-gray-700 mb-4">
        Rentify is a community-driven platform that makes it easy to share and borrow tools with your neighbors. Our mission is to help people save money, reduce waste, and build stronger local connections by making tools accessible to everyone.
      </p>
      <div className="flex justify-center gap-6 mb-4">
        {/* Icons */}
        <svg className="w-8 h-8 text-[#4ade80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
          <path d="M12 6v6l4 2" />
        </svg>
        <svg className="w-8 h-8 text-[#4ade80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a6 6 0 1112 0v2" />
        </svg>
        <svg className="w-8 h-8 text-[#4ade80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 00-1.4 0l-7 7a1 1 0 000 1.4l3 3a1 1 0 001.4 0l7-7a1 1 0 000-1.4l-3-3z" />
        </svg>
      </div>
      <ul className="list-disc list-inside text-gray-700 mb-4 text-left mx-auto max-w-md">
        <li>Save money by borrowing instead of buying</li>
        <li>Reduce clutter and waste in your home</li>
        <li>Help others and build trust in your community</li>
        <li>Discover new skills and DIY projects</li>
      </ul>
      <p className="text-gray-700">
        Join Rentify today and be part of a movement that empowers neighbors to help each other out!
      </p>
    </section>
  </main>
);

export default About;