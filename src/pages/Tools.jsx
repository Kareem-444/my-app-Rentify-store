import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "", label: "All Categories" },
  { value: "Electrical", label: "Electrical" },
  { value: "Hand", label: "Hand Tools" },
  { value: "Gardening", label: "Gardening" },
  { value: "Power", label: "Power Tools" },
];
const rentalTypes = [
  { value: "", label: "Any Rental Type" },
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

const TOOLS_PER_PAGE = 8;

function Tools() {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setTools(JSON.parse(localStorage.getItem("allTools")) || []);
    } catch {
      setTools([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("Error saving favorites:", err);
    }
  }, [favorites]);

  const featuredTool =
    tools.length > 0
      ? tools.reduce((prev, curr) =>
          (curr.popularity || 0) > (prev.popularity || 0) ? curr : prev
        )
      : null;

  let filteredTools = tools.filter((tool) => {
    const matchesSearch = (tool.name || tool.title || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? (tool.category === category) : true;
    const matchesRentalType = rentalType ? (tool.rentalType === rentalType) : true;
    return matchesSearch && matchesCategory && matchesRentalType;
  });

  if (sort === "price-asc") {
    filteredTools = filteredTools.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === "price-desc") {
    filteredTools = filteredTools.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sort === "newest") {
    filteredTools = filteredTools.sort((a, b) => new Date(b.added) - new Date(a.added));
  } else if (sort === "popular") {
    filteredTools = filteredTools.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  const gridTools = featuredTool
    ? filteredTools.filter((t) => t.id !== featuredTool.id)
    : filteredTools;

  const totalPages = Math.ceil(gridTools.length / TOOLS_PER_PAGE);
  const paginatedTools = gridTools.slice(
    (page - 1) * TOOLS_PER_PAGE,
    page * TOOLS_PER_PAGE
  );

  // Fix: Use correct tool object for navigation and favorites
  const handleDetails = (e, tool) => {
    e.stopPropagation();
    e.preventDefault();
    if (!tool?.id) {
      console.error("Missing tool id");
      return;
    }
    navigate(`/tools/${tool.id}`);
  };

  const handleRent = (e, tool) => {
    e.stopPropagation();
    e.preventDefault();
    if (!tool?.id) {
      console.error("Missing tool id");
      return;
    }
    navigate(`/rent/${tool.id}`, { state: { tool } });
  };

  const handleAddFavorite = (e, tool) => {
    e.stopPropagation();
    e.preventDefault();
    if (!tool?.id) {
      console.error("Missing tool id");
      return;
    }
    if (!favorites.some((fav) => fav.id === tool.id)) {
      const updated = [...favorites, tool];
      setFavorites(updated);
      try {
        localStorage.setItem("favorites", JSON.stringify(updated));
      } catch (err) {
        console.error("Error saving favorites:", err);
      }
    }
  };

  const inputStyles =
    "px-4 py-2 rounded-lg border border-gray-300 bg-white text-[#222] placeholder-gray-400 focus:ring-2 focus:ring-[#4ade80]";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 pt-24">
      <section className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
          <input
            type="text"
            placeholder="Search tools..."
            className={`flex-1 ${inputStyles}`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            className={inputStyles}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <select
            className={inputStyles}
            value={rentalType}
            onChange={(e) => {
              setRentalType(e.target.value);
              setPage(1);
            }}
          >
            {rentalTypes.map((rt) => (
              <option key={rt.value} value={rt.value}>{rt.label}</option>
            ))}
          </select>
          <select
            className={inputStyles}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortOptions.map((so) => (
              <option key={so.value} value={so.value}>{so.label}</option>
            ))}
          </select>
        </div>

        {/* Featured Tool */}
        {featuredTool && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-green-700 mb-4">Featured Tool</h3>
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-8 p-8 mb-2">
              <img
                src={featuredTool.image}
                alt={featuredTool.name || featuredTool.title}
                className="w-40 h-40 object-contain rounded-xl border border-gray-100"
              />
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-[#004d40] mb-2">{featuredTool.name || featuredTool.title}</h4>
                <p className="text-gray-700 mb-2">{featuredTool.description}</p>
                <div className="text-lg text-green-700 font-semibold mb-2">
                  ${featuredTool.price} / {featuredTool.rentalType}
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={(e) => handleDetails(e, featuredTool)}
                    className="bg-[#4ade80] text-[#004d40] px-5 py-2 rounded-full font-semibold shadow hover:bg-[#ffd600] hover:text-[#004d40] transition"
                  >
                    Details
                  </button>
                  <button
                    onClick={(e) => handleAddFavorite(e, featuredTool)}
                    className="bg-[#ffd600] text-[#004d40] px-5 py-2 rounded-full font-semibold shadow hover:bg-[#4ade80] hover:text-[#004d40] transition"
                  >
                    {favorites.some((fav) => fav.id === featuredTool.id) ? "Favorited" : "Add to Favorites"}
                  </button>
                  <button
                    onClick={(e) => handleRent(e, featuredTool)}
                    className="bg-[#004d40] text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-green-700 transition"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {paginatedTools.length > 0 ? (
            paginatedTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition cursor-pointer"
                onClick={(e) => handleDetails(e, tool)}
                role="button"
                tabIndex={0}
              >
                <img
                  src={tool.image}
                  alt={tool.name || tool.title}
                  className="mb-4 w-24 h-24 object-contain"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-green-700 mb-2">{tool.name || tool.title}</h3>
                <span className="text-gray-500 mb-2 text-center">{tool.description}</span>
                <div className="text-gray-700 text-sm mb-2">
                  <span className="font-semibold">Price:</span> ${tool.price} / {tool.rentalType}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                    tool.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {tool.status}
                </span>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={(e) => handleDetails(e, tool)}
                    className="bg-[#4ade80] text-[#004d40] px-4 py-2 rounded-full font-medium hover:bg-green-400 hover:text-white transition"
                  >
                    Details
                  </button>
                  <button
                    onClick={(e) => handleAddFavorite(e, tool)}
                    className="bg-[#ffd600] text-[#004d40] px-4 py-2 rounded-full font-medium hover:bg-[#4ade80] hover:text-white transition"
                  >
                    {favorites.some((fav) => fav.id === tool.id) ? "Favorited" : "Add to Favorites"}
                  </button>
                  <button
                    onClick={(e) => handleRent(e, tool)}
                    className="bg-[#004d40] text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 mt-8">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span>No tools found. Try adjusting your search or filters.</span>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full font-bold ${
                  page === i + 1
                    ? "bg-[#4ade80] text-[#004d40] shadow"
                    : "bg-gray-200 text-gray-700 hover:bg-[#ffd600] hover:text-[#004d40]"
                } transition`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Tools;