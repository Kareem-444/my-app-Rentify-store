import React from "react";
import { Link } from "react-router-dom";


const Privacy = () => (
  <main className="pt-28 min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
    <section className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl px-8 py-12 mt-8 border border-green-100 dark:border-gray-800 backdrop-blur-md transition-all duration-300">
      <h2 className="text-center text-4xl font-extrabold text-green-700 dark:text-green-400 mb-8 tracking-tight drop-shadow-lg">Privacy Policy</h2>
      <div className="space-y-6 text-lg">
        <p className="text-gray-700 dark:text-gray-200">
          <span className="font-semibold text-green-700 dark:text-green-300">Rentify</span> values your privacy and is committed to protecting your personal information. We only collect data necessary to provide our services, such as your name, email, and tool listings.
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          Your data will <span className="font-bold text-green-700 dark:text-green-300">never</span> be sold or shared with third parties except as required by law. You may contact us at any time to request deletion or modification of your personal data.
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          This policy may be updated from time to time. Please check back regularly for changes.
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          For questions or concerns, please visit our{' '}
          <Link to="/contact" className="text-[#4ade80] underline hover:text-green-700 dark:hover:text-green-300 transition font-semibold">
            Contact
          </Link>{' '}page.
        </p>
      </div>
    </section>
  </main>
);

export default Privacy;