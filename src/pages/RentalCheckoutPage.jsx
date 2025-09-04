import React, { useState, useEffect } from "react";
// For map, use leaflet CDN for demo (real app: use react-leaflet or Google Maps API)
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RentalCheckout = () => {

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const tool = location.state?.tool;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState(user?.displayName || user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [locationCoords, setLocationCoords] = useState(null); // {lat, lng}
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!tool) navigate("/tools");
  }, [tool, navigate]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        setError("End date must be after start date.");
        setTotal(0);
        return;
      }
      setError("");
      const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
      const pricePerDay = parseFloat(tool?.price?.replace(/[^0-9.]/g, "")) || 0;
      setTotal(days * pricePerDay);
    } else {
      setTotal(0);
      setError("");
    }
  }, [startDate, endDate, tool]);

  if (!tool) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone || phone.length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!address.trim()) {
      setError("Please enter your address.");
      return;
    }
    if (!locationCoords) {
      setError("Please select your exact location on the map.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the rental policy and terms.");
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      setError("End date must be after start date.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Instead of showing success, redirect to chat page with all info
      navigate(`/chat/${tool.ownerId || 'owner'}`,
        {
          state: {
            tool,
            customer: {
              fullName,
              email,
              phone,
              address,
              locationCoords,
            },
            rental: {
              startDate,
              endDate,
              notes,
              total,
            }
          }
        }
      );
    }, 1200);
  };

  // No success screen, user is redirected to chat page

  return (
    <div className="max-w-2xl mx-auto bg-white text-black rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-4">Rental Checkout</h2>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <img src={tool.image} alt={tool.title} className="w-40 h-40 object-cover rounded-lg self-center" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
          <p className="mb-2 text-gray-700">{tool.description}</p>
          <div className="text-gray-600 text-sm mb-1">{tool.specs || "No extra specs."}</div>
          <div className="text-gray-600 text-sm mb-1"><span className="font-semibold">Owner:</span> {tool.owner || "Tool Rental Store"}</div>
          <div className="text-gray-600 text-sm mb-1"><span className="font-semibold">Rental Type:</span> {tool.rentalType || "Daily"}</div>
          <div className="text-gray-600 text-sm mb-1"><span className="font-semibold">Status:</span> {tool.status || "Available"}</div>
          <div className="text-lg font-bold mt-2">Price: {tool.price || "$0"} <span className="text-base font-normal">/ day</span></div>
        </div>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1" htmlFor="start-date">Start Date</label>
            <input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded px-3 py-2 w-full" min={new Date().toISOString().split('T')[0]} required />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1" htmlFor="end-date">End Date</label>
            <input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded px-3 py-2 w-full" min={startDate || new Date().toISOString().split('T')[0]} required />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1" htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="e.g. 555-123456" required />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1" htmlFor="notes">Rental Notes (optional)</label>
            <input id="notes" type="text" value={notes} onChange={e => setNotes(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="Any special instructions?" />
          </div>
        </div>
        <div className="bg-gray-100 rounded p-4 mt-2">
          <h4 className="font-semibold mb-2">Your Info</h4>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="fullName">Full Name</label>
              <input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="Your full name" required />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="you@email.com" required />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-2">
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="e.g. 555-123456" required />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1" htmlFor="address">Address</label>
              <input id="address" type="text" value={address} onChange={e => setAddress(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="Street, City, etc." required />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition" onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    setLocationCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    setShowMap(true);
                  },
                  () => setError("Could not get your location. Please allow location access."),
                  { enableHighAccuracy: true }
                );
              } else {
                setError("Geolocation is not supported by your browser.");
              }
            }}>
              {locationCoords ? "Update Location" : "Choose My Location"}
            </button>
            {locationCoords && (
              <span className="text-green-700 text-sm">Location set ({locationCoords.lat.toFixed(4)}, {locationCoords.lng.toFixed(4)})</span>
            )}
          </div>
          {showMap && locationCoords && (
            <div className="mt-4">
              <iframe
                title="Map"
                width="100%"
                height="220"
                style={{ borderRadius: '12px', border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationCoords.lng-0.01}%2C${locationCoords.lat-0.01}%2C${locationCoords.lng+0.01}%2C${locationCoords.lat+0.01}&layer=mapnik&marker=${locationCoords.lat}%2C${locationCoords.lng}`}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="text-xs text-gray-500 mt-1">(Drag/zoom in the map to verify your location.)</div>
            </div>
          )}
        </div>
        <div className="bg-gray-50 rounded p-4 mt-2">
          <h4 className="font-semibold mb-2">Order Summary</h4>
          <div className="flex justify-between mb-1"><span>Rental Duration:</span> <span>{startDate && endDate ? `${Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1))} day(s)` : '-'}</span></div>
          <div className="flex justify-between mb-1"><span>Price per day:</span> <span>{tool.price || "$0"}</span></div>
          <div className="flex justify-between mb-1"><span>Rental Notes:</span> <span>{notes || '-'}</span></div>
          <div className="flex justify-between mb-1"><span>Address:</span> <span>{address || '-'}</span></div>
          <div className="flex justify-between mb-1"><span>Location:</span> <span>{locationCoords ? `${locationCoords.lat.toFixed(4)}, ${locationCoords.lng.toFixed(4)}` : '-'}</span></div>
          <div className="flex justify-between font-bold text-lg mt-2"><span>Total:</span> <span>${total.toFixed(2)}</span></div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input id="agree" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="accent-green-600" />
          <label htmlFor="agree" className="text-sm">I agree to the <a href="/terms" className="underline text-green-700" target="_blank" rel="noopener noreferrer">rental policy and terms</a>.</label>
        </div>
        {error && <div className="text-red-600 font-medium mt-2">{error}</div>}
        <button type="submit" disabled={isSubmitting} className="bg-[#4ade80] text-green-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-green-400 transition disabled:opacity-60 disabled:cursor-not-allowed">
          {isSubmitting ? "Processing..." : "Confirm Rent"}
        </button>
      </form>
      {/* Tool Owner Profile & Contact */}
      <div className="mt-10 bg-white border-t pt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Tool Owner</h3>
        <div className="flex items-center gap-4 mb-2">
          <img src={tool.ownerAvatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(tool.owner || 'Tool Rental Store') + '&background=4ade80&color=fff'} alt="Owner Avatar" className="w-16 h-16 rounded-full border" />
          <div>
            <div className="font-semibold text-lg text-gray-900">{tool.owner || 'Tool Rental Store'}</div>
            <div className="text-gray-600 text-sm">{tool.ownerEmail || 'contact@toolrental.com'}</div>
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition" onClick={() => window.open(`mailto:${tool.ownerEmail || 'contact@toolrental.com'}`)}>
            Message Owner
          </button>
          <button className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-green-700 transition" onClick={() => window.open(`tel:${tool.ownerPhone || ''}`)} disabled={!tool.ownerPhone}>
            Call Owner
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2">(Contact the owner for questions, pickup, or delivery details.)</div>
      </div>
    </div>
  );

};

export default RentalCheckout;
