
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCompany, loginTelegram } from "@/lib/api/auth";
import { useAuth } from "@/lib/hooks/useAuth";

export default function JoinPage() {
  const router = useRouter();
  const { saveToken } = useAuth();
  const [mode, setMode] = useState(null);
  const [form, setForm] = useState({
    companyName: "",
    password: "",
    userName: "",
    workingStart: "09:00",
    workingEnd: "18:00",
  });

  const telegramId = 123456789;

  const handleCreate = async () => {
    if (!form.companyName || !form.password) {
      alert("Введите название компании и пароль!");
      return;
    }

    try {
      const res = await createCompany({
        ...form,
        telegramId: String(telegramId),
        workingStart: form.workingStart.length === 5 ? `${form.workingStart}:00` : form.workingStart,
        workingEnd: form.workingEnd.length === 5 ? `${form.workingEnd}:00` : form.workingEnd,
      });
      saveToken(res.data.token);
      router.push("/home");
    } catch (e) {
      alert(`Ошибка: ${e.response?.data?.message || e.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginTelegram({
        telegramId,
        companyName: form.companyName,
        companyPassword: form.password,
        userName: form.userName,
      });
      saveToken(res.data.token);
      router.push("/home");
    } catch (e) {
      alert("Ошибка входа: " + (e.response?.data?.message || e.message));
    }
  };

  if (!mode) {
    return (
      <div className="flex flex-col items-center gap-4 mt-20">
        <button onClick={() => setMode("create")} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Создать компанию
        </button>
        <button onClick={() => setMode("login")} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Войти
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">
        {mode === "create" ? "Создание компании" : "Вход в компанию"}
      </h2>

      <input
        className="w-full p-3 mb-3 border rounded focus:ring-2 focus:ring-blue-400"
        placeholder="Название компании"
        value={form.companyName}
        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
      />
      <input
        className="w-full p-3 mb-3 border rounded focus:ring-2 focus:ring-blue-400"
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        className="w-full p-3 mb-3 border rounded focus:ring-2 focus:ring-blue-400"
        placeholder="Имя (опционально)"
        value={form.userName}
        onChange={(e) => setForm({ ...form, userName: e.target.value })}
      />

      {mode === "create" && (
        <div className="flex gap-2 mb-4">
          <input type="time" className="flex-1 border p-2 rounded" value={form.workingStart} onChange={(e) => setForm({ ...form, workingStart: e.target.value })} />
          <input type="time" className="flex-1 border p-2 rounded" value={form.workingEnd} onChange={(e) => setForm({ ...form, workingEnd: e.target.value })} />
        </div>
      )}

      <button
        onClick={mode === "create" ? handleCreate : handleLogin}
        className={`w-full py-3 rounded text-white font-semibold transition ${
          mode === "create" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {mode === "create" ? "Создать" : "Войти"}
      </button>
    </div>
  );
}
