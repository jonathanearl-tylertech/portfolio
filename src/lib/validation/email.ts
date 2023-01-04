import { z } from "zod";

export const emailSchema = z.string()
  .min(1, { message: "Is required"})
  .email({ message: "Invalid email address" });
