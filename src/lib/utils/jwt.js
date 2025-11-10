import jwtDecode from "jwt-decode";
export const decode = (token) => {
  try { return jwtDecode(token); } catch { return null; }
};
