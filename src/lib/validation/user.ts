import Ajv, { type JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { emailSchema } from './email';
import { passwordSchema } from './password';
import { usernameSchema } from './username';
export const PASSWORD_LEN_ERR = "Password must be between 8 and 256 characters";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajv.addFormat("password", /^.{8,256}$/)

interface CreateUser {
  email: string;
  username: string;
  password: string;
}

const createUserSchema: JSONSchemaType<CreateUser> = {
  type: 'object',
  properties: {
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
  },
  required: ['email', 'username', 'password'],
};

const validateCreateUser = ajv.compile(createUserSchema);

export const isCreateUser = (createUser: any) => {
  validateCreateUser(createUser);
  return validateCreateUser.errors;
}
