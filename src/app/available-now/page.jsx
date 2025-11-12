
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAvailableNow } from "@/lib/api/rooms";
import RoomCard from "@/components/RoomCard";

export default function AvailableNowPage() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await getAvailableNow();
        setRooms(res.data || []);
      } catch (e) {
        console.error("Ошибка загрузки доступных комнат:", e);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Доступные сейчас</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.length > 0 ? (
          rooms.map((r) => (
            <RoomCard key={r.id} room={r} onOpen={(id) => router.push(`/room/${id}`)} />
          ))
        ) : (
          <p className="text-gray-500">Нет доступных комнат</p>
        )}
      </div>
    </div>
  );
}
