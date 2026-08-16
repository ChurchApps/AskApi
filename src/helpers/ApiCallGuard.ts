export const ALLOWED_METHOD = "GET";
export const MAX_API_CALLS = 8;
export const MAX_PATH_LENGTH = 500;

export const PATH_PREFIXES: { [key: string]: string[] } = {
  membershipapi: ["/people", "/groups", "/forms", "/churches"],
  attendanceapi: ["/attendancerecords", "/campuses", "/services", "/servicetimes", "/sessions", "/visits", "/visitsessions", "/groupservicetimes"],
  contentapi: ["/events", "/sermons", "/songs", "/pages", "/files", "/blocks", "/bibles", "/arrangements", "/arrangementKeys", "/curatedCalendars", "/curatedEvents"],
  doingapi: ["/tasks", "/plans", "/planItems", "/assignments", "/positions", "/times", "/automations", "/actions", "/blockoutDates", "/conditions", "/conjunctions"],
  givingapi: ["/funddonations", "/donations", "/funds", "/donationbatches", "/subscriptions", "/customers"],
  messagingapi: ["/conversations", "/messages", "/notifications", "/privateMessages", "/devices", "/notificationPreferences"],
  reportingapi: ["/reports"]
};

export function normalizeApiName(apiName: unknown): string {
  return String(apiName || "").toLowerCase().replace(/[^a-z]/g, "");
}

export function sessionToken(au: { jwt?: string }, _body?: unknown): string {
  return typeof au?.jwt === "string" ? au.jwt : "";
}

export function executionToken(jwt: unknown): string {
  return typeof jwt === "string" ? jwt : "";
}

function pathnameOf(rawPath: string): string | null {
  if (typeof rawPath !== "string" || rawPath.length === 0 || rawPath.length > MAX_PATH_LENGTH) return null;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(rawPath) || rawPath.startsWith("//") || rawPath.includes("\\")) return null;
  const pathname = rawPath.split("?")[0];
  if (!pathname.startsWith("/")) return null;
  let decoded = pathname;
  try { decoded = decodeURIComponent(pathname); } catch { return null; }
  if (decoded.includes("..") || decoded.includes("\\") || decoded.includes("//") || decoded.includes("\0")) return null;
  return decoded.toLowerCase();
}

export function isPathAllowed(apiName: string, rawPath: string): boolean {
  const pathname = pathnameOf(rawPath);
  const prefixes = PATH_PREFIXES[apiName];
  if (!pathname || !prefixes) return false;
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
}

export function validateApiCall(apiCall: any): { ok: true; apiName: string } | { ok: false; error: string } {
  if (!apiCall || typeof apiCall !== "object") return { ok: false, error: "Invalid API call" };
  const apiName = normalizeApiName(apiCall.apiName);
  if (!PATH_PREFIXES[apiName]) return { ok: false, error: `Unknown API: ${apiCall.apiName}` };
  const method = String(apiCall.method || "").trim().toUpperCase();
  if (method !== ALLOWED_METHOD) return { ok: false, error: `Method not allowed: ${apiCall.method}` };
  if (!isPathAllowed(apiName, String(apiCall.path || ""))) return { ok: false, error: `Path not allowed: ${apiCall.path}` };
  return { ok: true, apiName };
}

export function selectApiCalls(apiCalls: any[]): any[] {
  if (!Array.isArray(apiCalls)) return [];
  const allowed: any[] = [];
  for (const apiCall of apiCalls) {
    if (allowed.length >= MAX_API_CALLS) break;
    if (validateApiCall(apiCall).ok) allowed.push(apiCall);
  }
  return allowed;
}
