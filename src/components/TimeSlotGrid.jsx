// import React from "react";
// import { formatTime } from "@/lib/utils/formatDate";

// export default function TimeSlotGrid({ groupedSlots, onSelect }) {
//   return (
//     <div className="space-y-4">
//       {Object.keys(groupedSlots).map((hour) => (
//         <div key={hour}>
//           <div className="font-medium">{hour}</div>
//           <div className="flex gap-2 mt-2 flex-wrap">
//             {groupedSlots[hour].map((slot) => (
//               <button
//                 key={slot.time}
//                 disabled={!slot.free}
//                 onClick={() => onSelect(slot.time)}
//                 className={`px-3 py-1 rounded ${slot.free ? "bg-green-200" : "bg-red-200 cursor-not-allowed"}`}
//               >
//                 {formatTime(slot.time)}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }




import React from "react";
import { formatTime } from "@/lib/utils/formatDate";

export default function TimeSlotGrid({ groupedSlots, onSelect }) {
  return (
    <div className="space-y-4">
      {Object.entries(groupedSlots).map(([hour, slots]) => (
        <div key={hour}>
          <div className="font-medium text-gray-800 dark:text-gray-200">{hour}</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {slots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.free}
                onClick={() => onSelect(slot.time)}
                className={`px-3 py-1 rounded-md text-sm transition ${
                  slot.free
                    ? "bg-green-100 hover:bg-green-200 text-green-800"
                    : "bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500"
                }`}
              >
                {formatTime(slot.time)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
