import { api } from "./client";

export const getCompanyRooms = () => api.get("/rooms/company");
export const getRoomTimeslots = (roomId, dateISO) =>
  api.get(`/rooms/${roomId}/timeslots`, { params: { date: dateISO } });
export const getBookingInfo = (roomId, timeISO) =>
  api.get(`/rooms/${roomId}/booking-info`, { params: { time: timeISO } });
export const bookRoom = (roomId, body) =>
  api.post(`/rooms/${roomId}/book`, body);
export const deleteBooking = (bookingId) =>
  api.delete(`/rooms/booking/${bookingId}`);
export const findRooms = (params) =>
  api.get("/rooms/findroom", { params });
export const getAvailableNow = () => api.get("/home/available-now");
export const getMyBookings = () => api.get("/home/my-bookings");
