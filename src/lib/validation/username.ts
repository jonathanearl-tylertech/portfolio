import { z } from "zod";

export const usernameSchema = z.string()
  .min(1, { message: "Is required" })
  .min(3, { message: "Must be between 3 and 20 characters" })
  .max(8, { message: "Must be between 3 and 20 characters" })
  .regex(/^\w{3,20}$/, { message: "Letters, numbers, dashes, and underscores only. Please try again without symbols." });

export const isUsername = (username: string) => {
  try {
    usernameSchema.parse(username);
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.flatten().fieldErrors
      return err.flatten().fieldErrors as { username: string[] };
    }
  }
}
