// Shared input hardening for the public form routes (/api/intake, /api/contact).
// Security review 2026-10-14, finding H4.

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape a user-supplied value before placing it into email HTML. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

/** Remove CR/LF so a value cannot inject extra headers into subject/replyTo. */
export function stripCrlf(value: unknown): string {
  return String(value ?? "").replace(/[\r\n]+/g, " ");
}

/** Coerce to string, trim and cap the length. Non-strings become "". */
export function clampField(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export const MAX_EMAIL_LENGTH = 254;

/**
 * Exactly one syntactically valid address: no commas, semicolons, whitespace,
 * angle brackets, quotes or a second "@" — nodemailer would treat those as lists.
 */
export function isValidSingleEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value.length === 0 || value.length > MAX_EMAIL_LENGTH) return false;
  if (/[,;\s<>"'()\\]/.test(value)) return false;
  if ((value.match(/@/g) || []).length !== 1) return false;
  return /^[A-Za-z0-9.!#$%&*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(
    value
  );
}

// Simple fixed-window per-IP limiter. NOTE: in-memory, so it is per serverless
// instance only (each warm Vercel instance has its own Map). It slows casual abuse;
// a shared store (Upstash/Vercel KV) is needed for a global limit.
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim() || "unknown";
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Returns true if the request is allowed, false if the key is over the limit. */
export function checkRateLimit(key: string, now: number = Date.now()): boolean {
  const bucket = rateBuckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    if (rateBuckets.size > 10000) {
      rateBuckets.forEach((b, k) => {
        if (now >= b.resetAt) rateBuckets.delete(k);
      });
    }
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}
