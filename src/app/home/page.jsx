"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCompanyRooms } from "@/lib/api/rooms";
import RoomCard from "@/components/RoomCard";

export default function HomePage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCompanyRooms();
        setRooms(res.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const openRoom = (id) => router.push(`/room/${id}`);

  return (
    <div>
      <h1 className="text-2xl mb-4">Комнаты</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((r) => <RoomCard key={r.id} room={r} onOpen={openRoom} />)}
      </div>
    </div>
  );
}
