import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyTools = () => {
  const [tools, setTools] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("myTools")) || [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  // Statistics
  const totalTools = tools.length;
  const availableTools = tools.filter((t) => t.status === 'Available').length;
  const rentedTools = tools.filter((t) => t.status === 'Rented').length;

  // Delete tool from both myTools and allTools
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      const updatedMyTools = tools.filter((tool) => tool.id !== id);
      setTools(updatedMyTools);
      localStorage.setItem("myTools", JSON.stringify(updatedMyTools));
      // Remove from allTools as well
      let allTools = [];
      try {
        allTools = JSON.parse(localStorage.getItem("allTools")) || [];
      } catch {
        allTools = [];
      }
      allTools = allTools.filter((tool) => tool.id !== id);
      localStorage.setItem("allTools", JSON.stringify(allTools));
    }
  };

  // Edit tool: pass tool data to AddNewTool.jsx
  const handleEdit = (tool) => {
    navigate("/add-tool", { state: { tool } });
  };

  const handleViewDetails = (id) => {
    navigate(`/tools/${id}`);
  };

  const handleAddTool = () => {
    navigate("/add-tool");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header & Add Tool Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-[#004d40]">My Tools Dashboard</h1>
          <button
            onClick={handleAddTool}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4ade80] text-[#004d40] font-bold rounded-full shadow-lg hover:bg-[#ffd600] hover:text-[#004d40] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" />
            </svg>
            Add New Tool
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-[#004d40]">{totalTools}</span>
            <span className="text-gray-600">Total Tools</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">{availableTools}</span>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-600">{rentedTools}</span>
            <span className="text-gray-600">Rented</span>
          </div>
        </div>

        {/* Tools Grid */}
        {tools.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-16">
            You haven’t added any tools yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition"
              >
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h2 className="text-xl font-semibold text-[#004d40] mb-2">{tool.name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tool.status === 'Available'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {tool.status}
                  </span>
                  <span className="text-gray-400 text-xs">
                    Added: {tool.added}
                  </span>
                </div>
                <div className="text-gray-700 text-sm mb-2">
                  <span className="font-semibold">Price:</span> ${tool.price} / {tool.rentalType}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(tool)}
                    className="px-4 py-2 bg-[#ffd600] text-[#004d40] rounded-full font-medium shadow hover:bg-[#ffeb3b] transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tool.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full font-medium shadow hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleViewDetails(tool.id)}
                    className="px-4 py-2 bg-[#4ade80] text-[#004d40] rounded-full font-medium shadow hover:bg-green-400 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTools;