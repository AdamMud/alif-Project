// "use client";
// import { useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";

// export function useAuth() {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const t = localStorage.getItem("token");
//     if (t) {
//       try {
//         setToken(t);
//         setUser(jwtDecode(t));
//       } catch (e) {
//         console.error("Invalid token", e);
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   const saveToken = (t) => {
//     localStorage.setItem("token", t);
//     setToken(t);
//     try { setUser(jwtDecode(t)); } catch {}
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//     if (typeof window !== "undefined") window.location.href = "/";
//   };

//   return { token, user, saveToken, logout };
// }
"use client";
import { useEffect, useState } from "react";
import * as jwtDecodePkg from "jwt-decode";

/**
 * Безопасная обёртка над jwt-decode, которая поддерживает
 * разные варианты экспорта (default / named / cjs).
 */
function safeJwtDecode(token) {
  if (!token) return null;
  // пакет может экспортироваться как функция или как объект { default: fn }
  const fn = jwtDecodePkg && (jwtDecodePkg.default || jwtDecodePkg);
  try {
    return fn(token);
  } catch (e) {
    console.warn("jwt decode failed", e);
    return null;
  }
}

export function useAuth() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (t) {
      try {
        setToken(t);
        setUser(safeJwtDecode(t));
      } catch (e) {
        console.error("Invalid token", e);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const saveToken = (t) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", t);
    }
    setToken(t);
    try {
      setUser(safeJwtDecode(t));
    } catch {}
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    setToken(null);
    setUser(null);
  };

  return { token, user, saveToken, logout };
}
