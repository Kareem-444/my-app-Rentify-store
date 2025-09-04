import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ChatPage = () => {
  const { ownerId } = useParams();
  const location = useLocation();
  const { tool, customer, rental } = location.state || {};

  return (
    <div className="max-w-2xl mx-auto bg-white text-black rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-4">Chat with Tool Owner</h2>
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <img src={tool?.ownerAvatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(tool?.owner || 'Tool Rental Store') + '&background=4ade80&color=fff'} alt="Owner Avatar" className="w-16 h-16 rounded-full border" />
          <div>
            <div className="font-semibold text-lg text-gray-900">{tool?.owner || 'Tool Rental Store'}</div>
            <div className="text-gray-600 text-sm">{tool?.ownerEmail || 'contact@toolrental.com'}</div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Rental Details</h3>
        <div className="bg-gray-50 rounded p-4">
          <div><span className="font-medium">Tool:</span> {tool?.title}</div>
          <div><span className="font-medium">Customer:</span> {customer?.fullName} ({customer?.email})</div>
          <div><span className="font-medium">Phone:</span> {customer?.phone}</div>
          <div><span className="font-medium">Address:</span> {customer?.address}</div>
          <div><span className="font-medium">Location:</span> {customer?.locationCoords ? `${customer.locationCoords.lat.toFixed(4)}, ${customer.locationCoords.lng.toFixed(4)}` : '-'}</div>
          <div><span className="font-medium">Rental Period:</span> {rental?.startDate} to {rental?.endDate}</div>
          <div><span className="font-medium">Notes:</span> {rental?.notes || '-'}</div>
          <div><span className="font-medium">Total Price:</span> ${rental?.total?.toFixed(2)}</div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Chat</h3>
        <div className="bg-gray-100 rounded p-4 h-48 mb-2 overflow-y-auto">(Chat messages go here...)</div>
        <form className="flex gap-2">
          <input type="text" className="flex-1 border rounded px-3 py-2" placeholder="Type your message..." />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Send</button>
        </form>
      </div>
      <div className="flex gap-3 mt-2">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition" onClick={() => window.open(`mailto:${tool?.ownerEmail || 'contact@toolrental.com'}`)}>
          Message Owner
        </button>
        <button className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-green-700 transition" onClick={() => window.open(`tel:${tool?.ownerPhone || ''}`)} disabled={!tool?.ownerPhone}>
          Call Owner
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
