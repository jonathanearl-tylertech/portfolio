import Ajv, { type JSONSchemaType } from 'ajv';
export const USERNAME_LEN_ERR = "Username must be between 3 and 20 characters";
export const USERNAME_CHAR_ERR = "Letters, numbers, dashes, and underscores only. Please try again without symbols.";
export const USERNAME_USE_ERR = "That username is already taken.";

const ajv = new Ajv({ allErrors: true });
// todo: fix username pattern validation
// ajv.addFormat("username", /^\w{3,20}$/);

export const usernameSchema: JSONSchemaType<string> = {
  type: 'string',
  minLength: 3,
  maxLength: 20,
  // format: 'username',
};

const validateUsername = ajv.compile(usernameSchema);

export const isUsername = (username: string) => {
  validateUsername(username);
  return validateUsername.errors;
}
