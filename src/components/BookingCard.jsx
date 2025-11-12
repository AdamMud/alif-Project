


import React from "react";

export default function BookingCard({ booking, onCancel }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <div>
        <div className="font-semibold text-gray-900 dark:text-white">{booking.roomName}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {booking.startAt} — {booking.endAt}
        </div>
      </div>

      {booking.canCancel && (
        <button
          onClick={() => onCancel(booking.id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        >
          Отменить
        </button>
      )}
    </div>
  );
}
