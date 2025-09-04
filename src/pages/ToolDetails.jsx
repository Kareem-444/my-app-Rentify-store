import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ToolDetails = () => { 
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let allTools = [];
    try {
      allTools = JSON.parse(localStorage.getItem("allTools")) || [];
    } catch {
      allTools = [];
    }
    // Support both string and number id
    const found = allTools.find((t) => String(t.id) === String(id));
    setTool(found || null);
  }, [id]);

  // Add to favorites
  const handleAddFavorite = () => {
    if (tool && !favorites.some((fav) => fav.id === tool.id)) {
      const updated = [...favorites, tool];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const isFavorite = tool && favorites.some((fav) => fav.id === tool.id);

  if (!tool) {
    return ( 
      <main className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center">
        <section className="w-full max-w-2xl mx-auto px-2 sm:px-6">
          <div className="bg-white rounded-xl shadow-lg text-gray-700 p-8 mt-24 text-center">
            <h1 className="text-2xl font-bold text-[#004d40]">Tool not found.</h1>
          </div>
        </section>
      </main>
    ); 
  }

  return (
    <main className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center">
      <section className="w-full max-w-3xl mx-auto px-2 sm:px-6">
        <div className="bg-gradient-to-br from-[#015958]/90 to-[#00332e]/90 text-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 border border-green-100 dark:border-gray-800">
          <div className="flex-shrink-0 w-full md:w-64 h-64 mb-6 md:mb-0">
            <img src={tool.image} alt={tool.title} className="w-full h-full object-cover rounded-2xl shadow-lg" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-[#ffd600] mb-2 drop-shadow tracking-tight">{tool.title}</h1>
              <p className="mb-4 text-white/90 text-lg">{tool.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#ffd600] text-[#004d40] text-xs font-bold px-3 py-1 rounded-full shadow">{tool.category}</span>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">${tool.price} / {tool.rentalType}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 bg-[#4ade80] text-[#004d40] font-bold py-3 rounded-full shadow-lg hover:bg-[#ffd600] hover:text-[#004d40] transition-all duration-200 text-lg"
                onClick={() => navigate(`/rent/${tool.id}`, { state: { tool } })}
              >
                Rent Now
              </button>
              <button
                className={`flex-1 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-200 ${isFavorite ? 'bg-red-500 text-white hover:bg-red-700' : 'bg-[#ffd600] text-[#004d40] hover:bg-[#ff9100] hover:text-white'}`}
                onClick={handleAddFavorite}
              >
                {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ToolDetails;