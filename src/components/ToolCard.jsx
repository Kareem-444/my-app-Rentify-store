import React from "react";
import { useNavigate } from "react-router-dom";

const ToolCard = ({ tool }) => {
  const navigate = useNavigate();

  const handleDetails = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!tool?.id) {
      console.error("Missing tool id");
      return;
    }
    navigate(`/tools/${tool.id}`);
  };

  const handleRentNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!tool?.id) {
      console.error("Missing tool id");
      return;
    }
    navigate(`/rent/${tool.id}`);
  };

  return (
    <div
      className="bg-gradient-to-br from-[#015958]/90 to-[#00332e]/90 text-white rounded-3xl shadow-2xl p-6 flex flex-col group hover:scale-[1.025] hover:shadow-green-200/40 dark:hover:shadow-green-900/40 transition-all duration-300 cursor-pointer border border-green-100 dark:border-gray-800"
      onClick={handleDetails}
      role="button"
      tabIndex={0}
    >
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-2xl shadow-lg">
        <img
          src={tool.image}
          alt={tool.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-[#ffd600] text-[#004d40] text-xs font-bold px-3 py-1 rounded-full shadow">{tool.category}</span>
      </div>
      <h2 className="text-2xl font-extrabold text-[#ffd600] drop-shadow mb-1 tracking-tight">{tool.title}</h2>
      <p className="mb-4 text-white/90 text-base min-h-[48px]">{tool.description}</p>
      <button
        className="mt-auto bg-[#ffd600] text-[#004d40] font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#ff9100] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ffd600] text-lg"
        onClick={handleRentNow}
      >
        Rent Now
      </button>
    </div>
  );
};

export default ToolCard;