import { api } from "./client";

export const entryPage = (telegramId) =>
  api.post("/first/entrypage", { telegramId });

export const createCompany = (payload) =>
  api.post("/first/create-company", payload);

export const loginTelegram = (payload) =>
  api.post("/first/login-telegram", payload);
