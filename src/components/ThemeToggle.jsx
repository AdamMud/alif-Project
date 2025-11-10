"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-primary/30 hover:bg-primary/10 transition"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-primary" />
      ) : (
        <Sun className="w-5 h-5 text-accent" />
      )}
    </button>
  );
}
