import React from "react";

const Terms = () => (
  <main className="pt-28 min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
    <section className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl px-8 py-12 border border-green-100 dark:border-gray-800 backdrop-blur-md transition-all duration-300">
      <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400 mb-6 tracking-tight drop-shadow-lg text-center">Terms &amp; Conditions</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">Last updated: August 2025</p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2 text-lg">
        <li>All rentals are subject to local laws and regulations.</li>
        <li>Users must provide accurate information.</li>
        <li>Tools must be returned in good condition.</li>
        <li>Rentify is not responsible for damage or loss.</li>
      </ul>
      <p className="text-gray-700 dark:text-gray-300 text-center">
        For more information, contact us at{' '}
        <a href="/contact" className="text-[#4ade80] underline hover:text-green-700 dark:hover:text-green-300 transition font-semibold">
          Contact
        </a>.
      </p>
    </section>
  </main>
);

export default Terms;