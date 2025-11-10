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
    workingStart: "09:00:00",
    workingEnd: "18:00:00",
  });

  const telegramId = 123456789;

  const handleCreate = async () => {
    const res = await createCompany({
      companyName: form.companyName,
      password: form.password,
      telegramId,
      userName: form.userName,
      workingStart: form.workingStart,
      workingEnd: form.workingEnd,
    });
    saveToken(res.data.token);
    router.push("/home");
  };

  const handleLogin = async () => {
    const res = await loginTelegram({
      telegramId,
      companyName: form.companyName,
      companyPassword: form.password,
      userName: form.userName,
    });
    saveToken(res.data.token);
    router.push("/home");
  };

  if (!mode) {
    return (
      <div className="flex flex-col items-center gap-4 mt-20">
        <button onClick={() => setMode("create")} className="px-5 py-2 bg-green-600 text-white rounded">Создать</button>
        <button onClick={() => setMode("login")} className="px-5 py-2 bg-blue-600 text-white rounded">Войти</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl mb-4">{mode === "create" ? "Создать компанию" : "Войти в компанию"}</h2>
      <input className="w-full border p-2 mb-2" placeholder="Название компании" value={form.companyName} onChange={(e) => setForm({...form, companyName: e.target.value})} />
      <input className="w-full border p-2 mb-2" placeholder="Пароль" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
      <input className="w-full border p-2 mb-2" placeholder="Имя (опционально)" value={form.userName} onChange={(e) => setForm({...form, userName: e.target.value})} />
      {mode === "create" && (
        <div className="flex gap-2 mb-4">
          <input type="time" value={form.workingStart} onChange={(e) => setForm({...form, workingStart: e.target.value})} />
          <input type="time" value={form.workingEnd} onChange={(e) => setForm({...form, workingEnd: e.target.value})} />
        </div>
      )}
      <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={mode === "create" ? handleCreate : handleLogin}>
        {mode === "create" ? "Создать" : "Войти"}
      </button>
    </div>
  );
}
