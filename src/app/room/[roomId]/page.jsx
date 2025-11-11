"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getRoomTimeslots, getBookingInfo, bookRoom } from "@/lib/api/rooms";
import TimeSlotGrid from "@/components/TimeSlotGrid";

function isoForDate(date) {
  // возвращаем ISO UTC в 00:00:00Z для указанной даты
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
}

function groupTimeslots(slotsObj) {
  // slotsObj { iso: true/false }
  const groups = {};
  Object.keys(slotsObj || {}).forEach((iso) => {
    const d = new Date(iso);
    const hour = d.toISOString().slice(11,13) + ":00"; // "09:00"
    if (!groups[hour]) groups[hour] = [];
    groups[hour].push({ time: iso, free: slotsObj[iso] });
  });
  // сортировка
  Object.keys(groups).forEach(h => groups[h].sort((a,b)=>a.time>b.time?1:-1));
  return groups;
}

export default function RoomPage({ params }) {
  const router = useRouter();
  const { roomId } = params;
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState({});
  const [grouped, setGrouped] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    const fetch = async () => {
      try {
        const res = await getRoomTimeslots(roomId, isoForDate(date));
        setSlots(res.data || {});
        setGrouped(groupTimeslots(res.data || {}));
      } catch (e) { console.error(e); }
    };
    fetch();
  }, [roomId, date]);

  const handleSelect = async (timeIso) => {
    setSelectedTime(timeIso);
    try {
      const res = await getBookingInfo(roomId, timeIso);
      setBookingInfo(res.data);
    } catch (e) { console.error(e); }
  };

  const handleBook = async () => {
    if (!bookingInfo) return;
    try {
      await bookRoom(roomId, { startAt: bookingInfo.startAt, endAt: bookingInfo.endAt });
      alert("Бронь создана");
      // обновим слоты
      const r = await getRoomTimeslots(roomId, isoForDate(date));
      setSlots(r.data || {});
      setGrouped(groupTimeslots(r.data || {}));
      setBookingInfo(null);
      setSelectedTime(null);
    } catch (err) {
      if (err?.response?.status === 409) alert("Время уже занято");
      else alert("Ошибка бронирования");
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Комната {roomId}</h1>

      <div className="mb-4">
        <label className="mr-2">Дата: </label>
        <input type="date" value={date.toISOString().slice(0,10)} onChange={(e)=>setDate(new Date(e.target.value))} />
      </div>

      <TimeSlotGrid groupedSlots={grouped} onSelect={handleSelect} />

      {selectedTime && bookingInfo && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          {bookingInfo.userName ? (
            <div>
              <div>Забронировано: {bookingInfo.userName}</div>
              <div>С: {bookingInfo.startAt}</div>
              <div>По: {bookingInfo.endAt}</div>
              {/* кнопка удаления будет здесь реализована при необходимости */}
            </div>
          ) : (
            <div>
              <div>Свободно: {bookingInfo.startAt} — {bookingInfo.endAt}</div>
              <button onClick={handleBook} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">Забронировать</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

