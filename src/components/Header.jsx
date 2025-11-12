


"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import { LogOut, UserPlus } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 backdrop-blur-md">
      {/* Логотип */}
      <div className="flex items-center gap-6">
        <Link
          href="/home"
          className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
        >
          RoomBooking
        </Link>

        <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link href="/home" className="hover:text-blue-500 transition-colors">Комнаты</Link>
          <Link href="/my-bookings" className="hover:text-blue-500 transition-colors">Мои брони</Link>
          <Link href="/available-now" className="hover:text-blue-500 transition-colors">Доступные сейчас</Link>
          <Link href="/search" className="hover:text-blue-500 transition-colors">Поиск</Link>
          {user?.role === "Admin" && (
            <Link href="/admin" className="hover:text-teal-500 transition-colors">Админ</Link>
          )}
        </nav>
      </div>

      {/* Правая часть */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300">{user.name}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:opacity-90 transition"
            >
              <LogOut size={16} />
              Выйти
            </button>
          </div>
        ) : (
          <Link
            href="/join"
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow hover:opacity-90 transition"
          >
            <UserPlus size={16} />
            Присоединиться
          </Link>
        )}
      </div>
    </header>
  );
}
