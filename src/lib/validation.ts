import { z } from "zod";

/**
 * Schema for review submission
 */
export const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80, "Name is too long"),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500, "Comment is too long").optional().or(z.literal("")),
  token: z.string().min(1, "CAPTCHA token required"), // Turnstile token
});

export type ReviewInput = z.infer<typeof reviewSchema>;
