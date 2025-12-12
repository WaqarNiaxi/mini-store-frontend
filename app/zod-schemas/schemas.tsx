import { z } from "zod";

export const bugSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters.")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed."),
    
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export type BugFormType = z.infer<typeof bugSchema>;
