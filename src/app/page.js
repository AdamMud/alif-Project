


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
