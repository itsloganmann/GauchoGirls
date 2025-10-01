import { createHash } from "crypto";

/**
 * Hash a value using SHA-256 for privacy-preserving storage
 * @param value - The value to hash (e.g., IP address, user agent)
 * @returns Hex-encoded hash
 */
export function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
