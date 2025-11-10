import React from "react";

export default function BookingCard({ booking, onCancel }) {
  return (
    <div className="p-3 bg-white rounded shadow flex justify-between items-center">
      <div>
        <div className="font-semibold">{booking.roomName}</div>
        <div className="text-sm text-gray-600">{booking.startAt} — {booking.endAt}</div>
      </div>
      {booking.canCancel && (
        <button onClick={() => onCancel(booking.id)} className="px-3 py-1 bg-red-500 text-white rounded">Отменить</button>
      )}
    </div>
  );
}
