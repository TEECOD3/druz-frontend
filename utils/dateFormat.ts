import format from "date-fns/format";

export const dateTime = (date: number | Date): string =>
  new Date(date).toISOString();

export const full = (date: number | Date): string =>
  format(date, "MMMM D, YYYY");
