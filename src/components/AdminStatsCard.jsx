// import React from "react";

// export default function AdminStatsCard({ title, value }) {
//   return (
//     <div className="p-4 bg-white rounded shadow">
//       <div className="text-sm text-gray-500">{title}</div>
//       <div className="text-2xl font-bold">{value}</div>
//     </div>
//   );
// }


// // import React from "react";

// // export default function AdminStatsCard({ title, value, variant = "default" }) {
// //   const baseClasses = "p-4 rounded shadow transition-transform transform hover:scale-105";
  
// //   const variants = {
// //     default: "bg-white text-gray-800",
// //     blue: "bg-blue-500 text-white shadow-lg",
// //     green: "bg-green-500 text-white shadow-md",
// //     gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl",
// //   };

// //   return (
// //     <div className={`${baseClasses} ${variants[variant]}`}>
// //       <div className="text-sm">{title}</div>
// //       <div className="text-2xl font-bold">{value}</div>
// //     </div>
// //   );
// // }




import React from "react";

export default function AdminStatsCard({ title, value }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}
