import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // Simulate user data from registration (replace with real user context in production)
  // Load user from localStorage or use default
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("profileUser")) || {
        name: "Jane Doe",
        email: "jane.doe@email.com",
      };
    } catch {
      return {
        name: "Jane Doe",
        email: "jane.doe@email.com",
      };
    }
  });
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: user.name, email: user.email });
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ old: "", new: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Dashboard stats
  const [myTools, setMyTools] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentTools, setRecentTools] = useState([]);
  const [lastActivity, setLastActivity] = useState("");

  useEffect(() => {
    // Load tools and favorites from localStorage
    try {
      setMyTools(JSON.parse(localStorage.getItem("myTools")) || []);
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    } catch {
      setMyTools([]);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    // Recently added tools (last 3)
    setRecentTools(myTools.slice(-3).reverse());
    // Last activity: most recent tool added or favorited
    const lastAdded = myTools.length ? myTools[myTools.length - 1].added : null;
    const lastFav = favorites.length ? favorites[favorites.length - 1].added : null;
    setLastActivity(lastFav || lastAdded || "No recent activity");
  }, [myTools, favorites]);

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/login");
  };

  // Edit profile handlers
  const handleEditProfile = () => setEditMode(true);
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");
    if (!editForm.name) {
      setEditError("Full Name is required.");
      return;
    }
    if (!editForm.email || !/\S+@\S+\.\S+/.test(editForm.email)) {
      setEditError("Valid email is required.");
      return;
    }
    setUser({ name: editForm.name, email: editForm.email });
    localStorage.setItem("profileUser", JSON.stringify({ name: editForm.name, email: editForm.email }));
    setEditSuccess("Profile updated successfully!");
    setTimeout(() => setEditMode(false), 1200);
  };

  // Change password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (!passwordForm.old || !passwordForm.new || !passwordForm.confirm) {
      setPasswordError("All fields are required.");
      return;
    }
    if (passwordForm.new.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }
    // Save password to localStorage (for demo only, not secure)
    localStorage.setItem("profileUserPassword", passwordForm.new);
    setPasswordSuccess("Password changed successfully!");
    setTimeout(() => setShowChangePassword(false), 1200);
  };

  // Consistent input style
  const inputClass = "p-2 border rounded text-black caret-black w-full";

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-[#e0ffe6] via-[#f0fff4] to-[#e0f7fa]">
      <main className="pt-24">
        <section className="max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl px-8 py-12 mt-8 border border-[#4ade80]">
          {/* User Card */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-4 border-[#4ade80] shadow-lg ring-4 ring-white/60"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#4ade80] border-2 border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow">✔</span>
            </div>
            {!editMode ? (
              <>
                <div className="text-2xl font-bold text-green-700 drop-shadow">{user.name}</div>
                <div className="text-gray-600 text-lg">{user.email}</div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleEditProfile}
                    className="px-4 py-2 bg-[#4ade80] text-green-900 rounded-full font-medium shadow hover:bg-green-400 transition text-center"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-medium shadow hover:bg-yellow-300 transition"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-medium shadow hover:bg-red-300 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <form className="w-full flex flex-col gap-3 bg-[#f0fff4] p-4 rounded-xl shadow-inner" onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className={inputClass}
                  placeholder="Full Name"
                  autoFocus
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className={inputClass}
                  placeholder="Email"
                />
                {editError && <span className="text-red-500 text-sm">{editError}</span>}
                {editSuccess && <span className="text-green-600 text-sm">{editSuccess}</span>}
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#4ade80] text-green-900 rounded-full font-medium shadow hover:bg-green-400 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-medium shadow hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Change Password Modal */}
          {showChangePassword && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-[#4ade80]">
                <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01"/><rect width="18" height="11" x="3" y="7" rx="2"/><path d="M7 7V4a5 5 0 0 1 10 0v3"/></svg>
                  Change Password
                </h3>
                <form className="flex flex-col gap-3" onSubmit={handlePasswordSubmit}>
                  <input
                    type="password"
                    name="old"
                    placeholder="Current Password"
                    value={passwordForm.old}
                    onChange={handlePasswordChange}
                    className={inputClass}
                  />
                  <input
                    type="password"
                    name="new"
                    placeholder="New Password"
                    value={passwordForm.new}
                    onChange={handlePasswordChange}
                    className={inputClass}
                  />
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirm}
                    onChange={handlePasswordChange}
                    className={inputClass}
                  />
                  {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                  {passwordSuccess && <span className="text-green-600 text-sm">{passwordSuccess}</span>}
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[#4ade80] text-green-900 rounded-full font-medium shadow hover:bg-green-400 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowChangePassword(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-medium shadow hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Dashboard Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-extrabold text-green-700 mb-6 flex items-center gap-2 drop-shadow">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12a9 9 0 0118 0 9 9 0 01-18 0z" />
              </svg>
              Dashboard
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              <div className="bg-green-50 rounded-xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-[#004d40]">{myTools.length}</span>
                <span className="text-gray-600">My Tools</span>
              </div>
              <div className="bg-green-50 rounded-xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-[#ffd600]">{favorites.length}</span>
                <span className="text-gray-600">Favorites</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
              <div className="bg-green-50 rounded-xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-green-700">{myTools.filter(t => t.status === "Rented").length}</span>
                <span className="text-gray-600">Rented Tools</span>
              </div>
              <div className="bg-green-50 rounded-xl shadow p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-green-700">{myTools.filter(t => t.status === "Available").length}</span>
                <span className="text-gray-600">Available Tools</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl shadow p-4 flex flex-col items-center mb-4 border border-[#4ade80]">
              <span className="font-semibold text-green-700">Last Activity</span>
              <span className="text-gray-600">{lastActivity || "No recent activity"}</span>
            </div>
            <div>
              <span className="font-semibold text-green-700">Recently Added Tools:</span>
              <div className="flex flex-wrap gap-3 mt-2">
                {recentTools.length === 0 ? (
                  <span className="text-gray-500">No tools added yet.</span>
                ) : (
                  recentTools.map((tool) => (
                    <div key={tool.id} className="bg-white border border-[#4ade80] rounded-lg shadow px-3 py-2 flex items-center gap-2">
                      <img src={tool.image} alt={tool.name} className="w-8 h-8 object-contain rounded-full border border-[#4ade80]" />
                      <span className="text-green-700 font-medium">{tool.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;