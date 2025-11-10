import React from "react";

export default function RoomCard({ room, onOpen }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold">{room.name}</h3>
      <p className="text-sm text-gray-600">{room.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm">Вместимость: {room.capacity || "-"}</span>
        <button onClick={() => onOpen(room.id)} className="px-3 py-1 bg-blue-500 text-white rounded">Открыть</button>
      </div>
    </div>
  );
}
