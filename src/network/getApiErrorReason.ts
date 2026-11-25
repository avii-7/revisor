import { isAxiosError } from "axios";

export function getApiErrorReason(error: unknown): string | undefined {
  if (!isAxiosError<unknown>(error)) return;

  const data = error.response?.data;
  if (typeof data !== "object" || data === null || !("reason" in data)) return;

  return typeof data.reason === "string" ? data.reason.trim() || undefined : undefined;
}
