import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg
      className="w-9 h-9 text-[#ffd600] drop-shadow-lg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" className="stroke-[#ffd600]" />
      <path d="M16 3v4M8 3v4M3 10h18" className="stroke-[#ffd600]" />
    </svg>
    <span className="text-3xl font-extrabold tracking-tight text-[#ffd600] font-logo drop-shadow-lg select-none">
      Rentify
    </span>
  </div>
);

const navLinks = [
  { to: '/', label: 'Home', icon: (
      <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
    ) },
  { to: '/tools', label: 'Tools', icon: (
      <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ) },
  { to: '/my-tools', label: 'My Tools', icon: (
      <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    ) },
  { to: '/favorites', label: 'Favorites', icon: (
      <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
      </svg>
    ) },
  { to: '/login', label: 'Login', icon: (
      <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.847.607 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) },
  { to: '/register', label: 'Register', icon: (
      <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ) },
  { to: '/profile', label: 'Profile', icon: (
      <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 21v-2a6 6 0 1112 0v2" />
      </svg>
    ) },
];

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-gradient-to-r from-[#004d40] via-[#015958] to-[#004d40] shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
        <Logo />
        {/* Hamburger Icon for mobile */}
        <button
          className="md:hidden ml-auto text-[#ffd600] focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Dropdown menu for mobile */}
        <nav className="w-full md:w-auto mt-4 md:mt-0">
          <ul className={`md:flex md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4 ${menuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-[#015958] z-50 p-4 shadow-lg' : 'hidden md:flex'}`}>
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center px-3 py-2 rounded-lg font-semibold transition-all duration-150
                    ${
                      location.pathname === to
                        ? 'bg-[#ffd600] text-[#004d40] shadow-lg'
                        : 'text-[#ffd600] hover:bg-[#015958] hover:text-[#ff9100]'
                    }
                  `}
                  onClick={() => setMenuOpen(false)}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;