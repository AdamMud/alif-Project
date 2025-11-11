// "use client";
// import { useEffect, useState } from "react";
// import { getOverview } from "@/lib/api/admin";
// import AdminStatsCard from "@/components/AdminStatsCard";

// export default function AdminPage() {
//     const [overview, setOverview] = useState(null);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await getOverview();
//                 setOverview(res.data);
//             } catch (e) { console.error(e); }
//         })();
//     }, []);

//     if (!overview) return <div>Загрузка...</div>;

//     return (
//         <div>
//             <h1 className="text-2xl mb-4">Админ панель</h1>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                 <AdminStatsCard title="Всего комнат" value={overview.totalRooms} />
//         <AdminStatsCard title="Пользователей" value={overview.totalUsers} />
//         <AdminStatsCard title="Всего броней" value={overview.totalBookings} />
//         <AdminStatsCard title="Активных броней" value={overview.activeBookings} />


//             </div>
//             {/* дополнительные графики и управление — можно дописать */}
//         </div>
//     );
// }




"use client";
import { useEffect, useState } from "react";
import { getOverview } from "@/lib/api/admin";
import AdminStatsCard from "@/components/AdminStatsCard";

export default function AdminPage() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getOverview();
        setOverview(res.data);
      } catch (e) {
        console.error("Ошибка при загрузке статистики:", e);
      }
    })();
  }, []);

  if (!overview) return <div className="text-center mt-10">Загрузка...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Админ панель</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <AdminStatsCard title="Всего комнат" value={overview.totalRooms} />
        <AdminStatsCard title="Пользователей" value={overview.totalUsers} />
        <AdminStatsCard title="Всего броней" value={overview.totalBookings} />
        <AdminStatsCard title="Активных броней" value={overview.activeBookings} />
      </div>
    </div>
  );
}
