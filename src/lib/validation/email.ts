import { z } from "zod";

export const emailSchema = z.string()
  .min(1, { message: "Is required" })
  .email({ message: "Invalid email address" });

export const isEmail = (email: string) => {
  try {
    emailSchema.parse(email);
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.flatten().fieldErrors
      return err.flatten().fieldErrors as { email: string[] };
    }
  }
}
