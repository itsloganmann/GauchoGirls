/**
 * Convert a name to a URL-safe slug
 * Preserves letters and numbers, converts spaces to hyphens
 */
export function toSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // Remove special chars, preserve unicode letters/numbers
    .replace(/\s+/g, "-") // Convert spaces to hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}
