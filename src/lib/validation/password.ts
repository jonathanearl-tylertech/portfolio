import { z } from "zod";

export const passwordSchema = z.string()
  .min(1, { message: 'Is required' })
  .refine(val => 12 <= val.length && val.length <= 50, { message: 'Must be between 12 and 50 characters'})
