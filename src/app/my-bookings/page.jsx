// "use client";
// import { useEffect, useState } from "react";
// import { getMyBookings } from "@/lib/api/rooms";
// import BookingCard from "@/components/BookingCard";

// export default function MyBookingsPage() {
//   const [data, setData] = useState({ active: [], past: [] });

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await getMyBookings();
//         setData(res.data || { active: [], past: [] });
//       } catch (e) { console.error(e); }
//     })();
//   }, []);

//   const cancel = async (id) => {
//     try {
//       await fetch(`/api/rooms/booking/${id}`, { method: "DELETE" }); // use api.delete in production
//       alert("Отменено");
//     } catch (e) { alert("Ошибка"); }
//   };

//   return (
//     <div>
//       <h2 className="text-xl mb-3">Активные</h2>
//       <div className="space-y-3 mb-6">{data.active.map(b => <BookingCard key={b.id} booking={{...b, canCancel: true}} onCancel={cancel} />)}</div>

//       <h2 className="text-xl mb-3">Прошедшие</h2>
//       <div className="space-y-3">{data.past.map(b => <BookingCard key={b.id} booking={{...b, canCancel: false}} />)}</div>
//     </div>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import { getMyBookings } from "@/lib/api/rooms";
import BookingCard from "@/components/BookingCard";

export default function MyBookingsPage() {
  const [data, setData] = useState({ active: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyBookings();
        setData(res.data || { active: [], past: [] });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="mt-10 text-center">Загрузка бронирований...</div>;

  return (
    <div>
      <h2 className="text-xl mb-3 font-semibold">Активные брони</h2>
      <div className="space-y-3 mb-6">
        {data.active.length ? (
          data.active.map((b) => <BookingCard key={b.id} booking={{ ...b, canCancel: true }} onCancel={() => {}} />)
        ) : (
          <p className="text-gray-500">Нет активных броней</p>
        )}
      </div>

      <h2 className="text-xl mb-3 font-semibold">Прошедшие</h2>
      <div className="space-y-3">
        {data.past.length ? (
          data.past.map((b) => <BookingCard key={b.id} booking={{ ...b, canCancel: false }} />)
        ) : (
          <p className="text-gray-500">Нет прошедших броней</p>
        )}
      </div>
    </div>
  );
}
