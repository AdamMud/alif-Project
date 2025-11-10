"use client";
import { useEffect, useState } from "react";
import { getAvailableNow } from "@/lib/api/rooms";
import RoomCard from "@/components/RoomCard";
import { useRouter } from "next/navigation";

export default function AvailableNow() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await getAvailableNow();
        setRooms(res.data || []);
      } catch (e) { console.error(e); }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Доступные сейчас</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map(r => <RoomCard key={r.id} room={r} onOpen={(id)=>router.push(`/room/${id}`)} />)}
      </div>
    </div>
  );
}
