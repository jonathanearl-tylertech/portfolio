import { z } from "zod";
import { emailSchema } from "./email";
import { passwordSchema } from "./password";
import { usernameSchema } from "./username";

const registrationSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema
});

export interface IRegistrationError {
  username?: string[];
  email?: string[];
  password?: string[];
}

export type IRegistration = z.infer<typeof registrationSchema>;

export const isRegistration = (registration: IRegistration) => {
  try {
    registrationSchema.parse(registration);
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.flatten().fieldErrors
      return err.flatten().fieldErrors as any as IRegistrationError;
    }
  }
}
