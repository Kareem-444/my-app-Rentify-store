import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  // Remove favorite
  const removeFavorite = (id) => {
    const updated = favorites.filter((tool) => tool.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleDetails = (e, tool) => {
    e.stopPropagation();
    e.preventDefault();
    if (!tool?.id) {
      console.error("Missing tool id");
      return;
    }
    navigate(`/tools/${tool.id}`);
  };

  const handleRentNow = (e, tool) => {
    e.stopPropagation();
    e.preventDefault();
    if (!tool?.id) {
      console.error("Missing tool id");
      return;
    }
    navigate(`/rent/${tool.id}`, { state: { tool } });
  };

  if (!favorites.length) {
    return (
      <main className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center">
        <section className="w-full max-w-2xl mx-auto px-2 sm:px-6">
          <div className="bg-[#015958] rounded-xl shadow-lg text-white p-8 mt-24 text-center">
            <h1 className="text-2xl font-bold text-[#ffd600]">No favorites yet.</h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center">
      <section className="w-full max-w-5xl mx-auto px-2 sm:px-6">
        <h1 className="text-4xl font-extrabold text-[#004d40] mb-10 text-center drop-shadow-lg tracking-tight">My Favorites</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((tool) => (
            <div
              key={tool.id}
              className="bg-gradient-to-br from-[#015958]/90 to-[#00332e]/90 text-white rounded-3xl shadow-2xl p-6 flex flex-col group hover:scale-[1.025] hover:shadow-green-200/40 dark:hover:shadow-green-900/40 transition-all duration-300 cursor-pointer border border-green-100 dark:border-gray-800"
              onClick={(e) => handleDetails(e, tool)}
              role="button"
              tabIndex={0}
            >
              <div className="relative w-full h-40 mb-4 overflow-hidden rounded-2xl shadow-lg">
                <img src={tool.image} alt={tool.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2 right-2 bg-[#ffd600] text-[#004d40] text-xs font-bold px-3 py-1 rounded-full shadow">{tool.category}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#ffd600] drop-shadow mb-1 tracking-tight">{tool.title}</h2>
              <p className="mb-4 text-white/90 text-base min-h-[48px]">{tool.description}</p>
              <div className="flex gap-2 mt-auto w-full">
                <button
                  className="flex-1 bg-[#ffd600] text-[#004d40] font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#ff9100] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffd600] text-lg"
                  onClick={(e) => handleRentNow(e, tool)}
                >
                  Rent Now
                </button>
                <button
                  className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); removeFavorite(tool.id); }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Favorites;