// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.js file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );

// }




// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { entryPage } from "@/lib/api/auth";
// import { useAuth } from "@/lib/hooks/useAuth";

// export default function Entry() {
//   const router = useRouter();
//   const { saveToken } = useAuth();

//   useEffect(() => {
//     const telegramId = 123456789; // замените реальным ID в production

//     (async () => {
//       try {
//         const res = await entryPage(telegramId);
//         if (res.status === 200 && res.data?.token) {
//           saveToken(res.data.token);
//           router.push("/home");
//         } else {
//           router.push("/join");
//         }
//       } catch (err) {
//         if (err?.response?.status === 404) router.push("/join");
//         else router.push("/join");
//       }
//     })();
//   }, []);

//   return <div className="h-60 flex items-center justify-center">Проверка пользователя…</div>;
// }



// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { entryPage } from "@/lib/api/auth";
// import { useAuth } from "@/lib/hooks/useAuth";

// export default function EntryPage() {
//   const router = useRouter();
//   const { saveToken } = useAuth();

//   useEffect(() => {
//     const telegramId = 123456789;

//     (async () => {
//       try {
//         const res = await entryPage(telegramId);
//         if (res?.data?.token) {
//           saveToken(res.data.token);
//           router.push("/home");
//         } else {
//           router.push("/join");
//         }
//       } catch (err) {
//         router.push("/join");
//       }
//     })();
//   }, []);

//   return <div className="h-60 flex items-center justify-center">Проверка пользователя…</div>;
// }



"use client";
import { useEffect } from "react";

export default function EntryPage() {
  useEffect(() => {
    // Проверяем, что это Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;

      if (user) {
        // Формируем только нужные данные
        const payload = {
          tg_id: user.id,
          name: user.first_name,
          username: user.username || null,
        };

        console.log("👤 Telegram user detected:", payload);

        // Отправляем на сервер
        fetch("https://alification3-2-production.up.railway.app/api/entrypage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((data) => console.log("✅ EntryPage response:", data))
          .catch((err) => console.error("❌ EntryPage error:", err));
      } else {
        console.warn("⚠️ Telegram user not found in initDataUnsafe");
      }
    } else {
      console.warn("⚠️ Not running inside Telegram WebApp");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold mb-4">Инициализация Telegram...</h1>
      <p className="text-gray-500">Пожалуйста, подождите, идёт подключение.</p>
    </div>
  );
}
