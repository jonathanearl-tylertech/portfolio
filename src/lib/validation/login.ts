import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Is required' }),
  password: z.string().min(1, { message: 'Is required' }),
});

export interface ILoginForm {
  username?: string;
  password?: string;
  error?: ILoginError;
}

export interface ILoginError {
  username?: string[];
  password?: string[];
}

export type ILogin = z.infer<typeof loginSchema>;

export const isLogin = (registration: ILogin) => {
  try {
    loginSchema.parse(registration);
  } catch (err) {
    if (err instanceof z.ZodError) {
      err.flatten().fieldErrors
      return err.flatten().fieldErrors as any as ILoginError;
    }
  }
}
