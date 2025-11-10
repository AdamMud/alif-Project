import { api } from "./client";

export const getOverview = () => api.get("/admin/overview");
export const createRoom = (body) => api.post("/rooms/create", body);
export const getRoomUtilization = () => api.get("/admin/room-utilization");
export const getTopRooms = () => api.get("/admin/top-rooms");
export const getUserActivity = () => api.get("/admin/user-activity");
export const getBookingsTrend = () => api.get("/admin/bookings-trend");
export const getAllUsers = () => api.get("/admin/all-users");
export const makeAdmin = (userId) => api.put(`/admin/make-admin/${userId}`);
export const revokeAdmin = (userId) => api.put(`/admin/revoke-admin/${userId}`);
export const deleteUser = (userId) => api.delete(`/admin/delete-user/${userId}`);
