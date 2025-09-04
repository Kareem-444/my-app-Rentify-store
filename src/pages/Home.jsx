import React from "react";
import { Link } from "react-router-dom";

const features = [
	{
		icon: (
			<svg
				className="w-10 h-10 text-[#4ade80]"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="M21 21l-4.35-4.35" />
			</svg>
		),
		title: "Easy Search",
		text: "Quickly find the tools you need with powerful search and filters.",
	},
	{
		icon: (
			<svg
				className="w-10 h-10 text-[#4ade80]"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
			</svg>
		),
		title: "Save Money",
		text: "Rent instead of buying. Only pay for what you use.",
	},
	{
		icon: (
			<svg
				className="w-10 h-10 text-[#4ade80]"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" />
			</svg>
		),
		title: "Community Sharing",
		text: "Connect with neighbors and build a sharing community.",
	},
	{
		icon: (
			<svg
				className="w-10 h-10 text-[#4ade80]"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path d="M12 8v4l3 3" />
				<circle cx="12" cy="12" r="10" />
			</svg>
		),
		title: "Fast Booking",
		text: "Reserve tools instantly and get started on your project.",
	},
];

const howItWorks = [
	{
		icon: (
			<svg
				className="w-8 h-8 text-[#ffd600]"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="M21 21l-4.35-4.35" />
			</svg>
		),
		title: "Search",
		text: "Browse or search for the tool you need.",
	},
	{
		icon: (
			<svg
				className="w-8 h-8 text-[#ffd600]"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<rect x="3" y="7" width="18" height="13" rx="2" />
				<path d="M16 3v4M8 3v4M3 10h18" />
			</svg>
		),
		title: "Rent",
		text: "Book the tool for the days you need it.",
	},
	{
		icon: (
			<svg
				className="w-8 h-8 text-[#ffd600]"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2" />
				<circle cx="12" cy="7" r="4" />
			</svg>
		),
		title: "Enjoy",
		text: "Pick up, use, and return the tool with ease.",
	},
];

const Home = () => (
	<div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
		{/* Hero Section */}
		<section className="relative flex flex-col items-center justify-center text-center py-20 px-4 bg-[#004d40]">
			<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20 pointer-events-none" />
			<div className="relative z-10 max-w-2xl mx-auto">
				<img
					src="https://img.icons8.com/color/200/toolbox.png"
					alt="Rentify Logo"
					className="w-24 h-24 mx-auto mb-6 drop-shadow-xl"
				/>
				<h1 className="text-4xl sm:text-5xl font-extrabold text-[#ffd600] mb-4 drop-shadow-lg">
					Rent. Share. Build. Together.
				</h1>
				<p className="text-lg sm:text-xl text-white mb-8">
					Rentify is your trusted platform for renting and sharing tools in your
					community. Save money, reduce waste, and connect with neighbors for
					every project.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						to="/tools"
						className="px-8 py-3 rounded-full bg-[#ffd600] text-[#004d40] font-bold text-lg shadow-xl hover:scale-105 hover:bg-[#ffeb3b] transition-all duration-200"
					>
						Explore Tools
					</Link>
					<Link
						to="/my-tools"
						className="px-8 py-3 rounded-full bg-white text-[#004d40] font-bold text-lg shadow-xl hover:scale-105 hover:bg-[#4ade80] hover:text-white transition-all duration-200"
					>
						List Your Tool
					</Link>
				</div>
			</div>
		</section>

		{/* Features Section */}
		<section className="max-w-5xl mx-auto py-16 px-4">
			<h2 className="text-3xl font-bold text-center text-green-700 mb-10">
				Why Choose Rentify?
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
				{features.map((feature, idx) => (
					<div
						key={idx}
						className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
					>
						<div className="mb-4">{feature.icon}</div>
						<h3 className="text-lg font-semibold text-green-700 mb-2">
							{feature.title}
						</h3>
						<p className="text-gray-600">{feature.text}</p>
					</div>
				))}
			</div>
		</section>

		{/* How It Works Section */}
		<section className="bg-[#015958] py-16 px-4">
			<h2 className="text-3xl font-bold text-center text-[#ffd600] mb-10">
				How It Works
			</h2>
			<div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
				{howItWorks.map((step, idx) => (
					<div
						key={idx}
						className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6 w-full md:w-1/3"
					>
						<div className="mb-3">{step.icon}</div>
						<h4 className="text-lg font-semibold text-green-700 mb-1">
							{step.title}
						</h4>
						<p className="text-gray-600">{step.text}</p>
					</div>
				))}
			</div>
		</section>

		{/* Call-to-Action Section */}
		<section className="py-16 px-4 text-center">
			<h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">
				Having a tool to share?
			</h2>
			<p className="text-lg text-gray-700 mb-6">
				List your tools and help your community grow. Earn extra income and make a
				difference!
			</p>
			<Link
				to="/my-tools"
				className="inline-block px-8 py-4 rounded-full bg-[#4ade80] text-[#004d40] font-bold text-lg shadow-xl hover:scale-105 hover:bg-[#ffd600] hover:text-[#004d40] transition-all duration-200"
			>
				Add Your Tool
			</Link>
		</section>

		{/* Footer */}
		<footer className="bg-white py-8 px-4 text-center shadow-inner flex flex-col items-center gap-4">
			<div className="flex gap-6 mb-2">
				<Link
					to="/privacy"
					className="text-green-700 hover:text-green-500 font-medium transition"
				>
					Privacy Policy
				</Link>
				<Link
					to="/terms"
					className="text-green-700 hover:text-green-500 font-medium transition"
				>
					Terms
				</Link>
				<Link
					to="/contact"
					className="text-green-700 hover:text-green-500 font-medium transition"
				>
					Contact
				</Link>
			</div>
			<div className="flex gap-4 mb-2">
				<a
					href="#"
					aria-label="Facebook"
					className="text-green-700 text-xl hover:text-green-500 transition"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z" />
					</svg>
				</a>
				<a
					href="#"
					aria-label="Twitter"
					className="text-green-700 text-xl hover:text-green-500 transition"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.15c-.37.63-.58 1.36-.58 2.14 0 1.48.75 2.78 1.89 3.54-.7-.02-1.36-.21-1.94-.53v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.69 2.11 2.92 3.97 2.95A8.6 8.6 0 012 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 007.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0022.46 6z" />
					</svg>
				</a>
				<a
					href="#"
					aria-label="Instagram"
					className="text-green-700 text-xl hover:text-green-500 transition"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm6.25 1.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
					</svg>
				</a>
			</div>
			<div className="text-gray-700 text-sm">
				&copy; {new Date().getFullYear()} Rentify. All rights reserved.
			</div>
		</footer>
	</div>
);

export default Home;