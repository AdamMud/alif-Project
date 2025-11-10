import { format, parseISO } from "date-fns";

export const formatTime = (iso) => {
  try {
    return format(parseISO(iso), "HH:mm");
  } catch {
    return iso;
  }
};
