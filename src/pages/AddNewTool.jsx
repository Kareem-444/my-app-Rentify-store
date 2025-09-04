import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const rentalTypes = ["Daily", "Weekly", "Monthly"];

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const AddNewTool = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingTool = location.state?.tool || null;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    rentalType: rentalTypes[0],
    available: true,
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Pre-fill form if editing
  useEffect(() => {
    if (editingTool) {
      setForm({
        name: editingTool.name,
        description: editingTool.description,
        price: editingTool.price,
        rentalType: editingTool.rentalType,
        available: editingTool.status === "Available",
        image: editingTool.image,
      });
      setImagePreview(editingTool.image);
    }
  }, [editingTool]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      setForm((prev) => ({ ...prev, image: base64 }));
      setImagePreview(base64);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create or update tool object
    const toolId = editingTool ? editingTool.id : Date.now().toString();
    const newTool = {
      id: toolId,
      name: form.name,
      description: form.description,
      price: form.price,
      rentalType: form.rentalType,
      status: form.available ? "Available" : "Rented",
      image: form.image,
      added: editingTool ? editingTool.added : new Date().toLocaleDateString(),
    };

    // Update allTools
    let allTools = [];
    try {
      allTools = JSON.parse(localStorage.getItem("allTools")) || [];
    } catch {
      allTools = [];
    }
    if (editingTool) {
      allTools = allTools.map((t) => (t.id === toolId ? newTool : t));
    } else {
      allTools.push(newTool);
    }
    localStorage.setItem("allTools", JSON.stringify(allTools));

    // Update myTools
    let myTools = [];
    try {
      myTools = JSON.parse(localStorage.getItem("myTools")) || [];
    } catch {
      myTools = [];
    }
    if (editingTool) {
      myTools = myTools.map((t) => (t.id === toolId ? newTool : t));
    } else {
      myTools.push(newTool);
    }
    localStorage.setItem("myTools", JSON.stringify(myTools));

    navigate("/my-tools");
  };

  const handleCancel = () => {
    navigate("/my-tools");
  };

  // Common input styles for all fields
  const inputStyles =
    "w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#4ade80] bg-white text-[#222] placeholder-gray-400";

  return (
    <main className="min-h-screen pt-28 pb-12 bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center">
      <section className="w-full max-w-xl mx-auto px-2 sm:px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-green-100 dark:border-gray-800">
          <h1 className="text-4xl font-extrabold text-[#004d40] mb-6 text-center drop-shadow-lg tracking-tight">
            {editingTool ? "Edit Tool" : "Add New Tool"}
          </h1>
          {imagePreview && (
            <div className="flex justify-center mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-28 h-28 object-contain rounded-xl border border-gray-200 shadow"
              />
            </div>
          )}
          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold text-green-700 mb-1">
                Tool Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className={inputStyles}
                placeholder="e.g. Cordless Drill"
              />
            </div>
            <div>
              <label className="block font-semibold text-green-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                required
                value={form.description}
                onChange={handleChange}
                rows={3}
                className={inputStyles}
                placeholder="Describe your tool..."
                style={{ minHeight: 80 }}
              />
            </div>
            <div>
              <label className="block font-semibold text-green-700 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
                style={{ color: "#222", background: "#fff" }}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block font-semibold text-green-700 mb-1">
                  Rental Price
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min={0}
                  value={form.price}
                  onChange={handleChange}
                  className={inputStyles}
                  placeholder="e.g. 10"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold text-green-700 mb-1">
                  Rental Type
                </label>
                <select
                  name="rentalType"
                  value={form.rentalType}
                  onChange={handleChange}
                  className={inputStyles}
                >
                  {rentalTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                id="available"
                className="accent-[#4ade80] w-5 h-5"
                style={{ background: "#fff" }}
              />
              <label htmlFor="available" className="font-semibold text-green-700">
                Available for Rent
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 py-3 rounded-full bg-[#4ade80] text-[#004d40] font-bold text-lg shadow-lg hover:bg-[#ffd600] hover:text-[#004d40] transition-all duration-200"
              >
                Save Tool
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 font-bold text-lg shadow hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
  </main>
  );
}

export default AddNewTool;