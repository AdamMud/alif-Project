// "use client";
// import { useState } from "react";
// import { findRooms } from "@/lib/api/rooms";
// import RoomCard from "@/components/RoomCard";

// export default function SearchPage() {
//   const [filters, setFilters] = useState({ MinCapacity: "", MaxCapacity: "", Name: "", StartAt: "", EndAt: "" });
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     const params = {};
//     Object.keys(filters).forEach(k => { if (filters[k]) params[k] = filters[k]; });
//     const res = await findRooms(params);
//     setResults(res.data || []);
//   };

//   return (
//     <div>
//       <h1 className="text-2xl mb-4">Поиск</h1>
//       <div className="mb-4 space-y-2">
//         <input placeholder="MinCapacity" value={filters.MinCapacity} onChange={e=>setFilters({...filters, MinCapacity:e.target.value})} className="border p-2"/>
//         <input placeholder="MaxCapacity" value={filters.MaxCapacity} onChange={e=>setFilters({...filters, MaxCapacity:e.target.value})} className="border p-2"/>
//         <input placeholder="Name" value={filters.Name} onChange={e=>setFilters({...filters, Name:e.target.value})} className="border p-2"/>
//         <div className="flex gap-2">
//           <input type="datetime-local" value={filters.StartAt} onChange={e=>setFilters({...filters, StartAt:e.target.value})} className="border p-2"/>
//           <input type="datetime-local" value={filters.EndAt} onChange={e=>setFilters({...filters, EndAt:e.target.value})} className="border p-2"/>
//         </div>
//         <button onClick={handleSearch} className="px-3 py-1 bg-indigo-600 text-white rounded">Найти</button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {results.map(r => <RoomCard key={r.id} room={r} onOpen={()=>{}}/>)}
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { findRooms } from "@/lib/api/rooms";
import RoomCard from "@/components/RoomCard";

export default function SearchPage() {
  const [filters, setFilters] = useState({ MinCapacity: "", MaxCapacity: "", Name: "", StartAt: "", EndAt: "" });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => v && (params[k] = v));
    try {
      const res = await findRooms(params);
      setResults(res.data || []);
    } catch (e) {
      console.error(e);
      alert("Ошибка поиска");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Поиск комнат</h1>
      <div className="mb-4 space-y-2">
        <input placeholder="MinCapacity" value={filters.MinCapacity} onChange={e => setFilters({ ...filters, MinCapacity: e.target.value })} className="border p-2 w-full rounded" />
        <input placeholder="MaxCapacity" value={filters.MaxCapacity} onChange={e => setFilters({ ...filters, MaxCapacity: e.target.value })} className="border p-2 w-full rounded" />
        <input placeholder="Name" value={filters.Name} onChange={e => setFilters({ ...filters, Name: e.target.value })} className="border p-2 w-full rounded" />
        <div className="flex gap-2">
          <input type="datetime-local" value={filters.StartAt} onChange={e => setFilters({ ...filters, StartAt: e.target.value })} className="border p-2 flex-1 rounded" />
          <input type="datetime-local" value={filters.EndAt} onChange={e => setFilters({ ...filters, EndAt: e.target.value })} className="border p-2 flex-1 rounded" />
        </div>
        <button onClick={handleSearch} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Найти</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.length ? (
          results.map((r) => <RoomCard key={r.id} room={r} onOpen={() => {}} />)
        ) : (
          <p className="text-gray-500">Нет результатов</p>
        )}
      </div>
    </div>
  );
}
р