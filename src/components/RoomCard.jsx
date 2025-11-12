


import React from "react";

export default function RoomCard({ room, onOpen }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white">{room.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{room.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Вместимость: {room.capacity || "—"}
        </span>
        <button
          onClick={() => onOpen(room.id)}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Открыть
        </button>
      </div>
    </div>
  );
}
