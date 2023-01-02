import Ajv, { type JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
export const USERNAME_LEN_ERR = "Username must be between 3 and 20 characters";
export const USERNAME_CHAR_ERR = "Letters, numbers, dashes, and underscores only. Please try again without symbols.";
export const USERNAME_USE_ERR = "That username is already taken.";
export const PASSWORD_LEN_ERR = "Password must be between 8 and 256 characters";
export const EMAIL_REQUIRED_ERROR = "Email is required";
export const EMAIL_PATTERN_ERROR = "Email must be a valid address... example@gmail.com";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajv.addFormat("username", /^\w{3,20}$/)
// ajv.addFormat("email", /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
ajv.addFormat("password", /^.{8,256}$/)

interface CreateUser {
  email: string;
  username: string;
  password: string;
}

const usernameSchema: JSONSchemaType<string> = {
  type: 'string',
  format: 'username',
  minLength: 3,
  maxLength: 20,
};

const passwordSchema: JSONSchemaType<string> = {
  type: 'string',
  format: 'password',
  minLength: 8,
  maxLength: 256,
};

const emailSchema: JSONSchemaType<string> = {
  type: 'string',
  format: 'email',
};

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
const validateEmail = ajv.compile(emailSchema);
const validatePassword = ajv.compile(passwordSchema);
const validateUsername = ajv.compile(usernameSchema);

export const isCreateUser = (createUser: any) => {
  validateCreateUser(createUser);
  console.log(validateCreateUser.errors);
  return validateCreateUser.errors;
}

export const isUsername = (username: string) => {
  validateUsername(username);
  return validateUsername.errors;
}

export const isPassword = (password: string) => {
  validatePassword(password);
  return validatePassword.errors;
}

export const isEmail = (email: string) => {
  validateEmail(email);
  console.log('emailerros', validateEmail.errors)
  return validateEmail.errors;
}
