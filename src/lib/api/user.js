import { api } from "./client";

export const getMyBookings = () => api.get("/home/my-bookings");
