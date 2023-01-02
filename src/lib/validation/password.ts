import Ajv, { type JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
export const PASSWORD_LEN_ERR = "Password must be between 8 and 256 characters";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajv.addFormat("password", /^.{8,256}$/)

export const passwordSchema: JSONSchemaType<string> = {
  type: 'string',
  format: 'password',
  minLength: 8,
  maxLength: 256,
};

const validatePassword = ajv.compile(passwordSchema);

export const isPassword = (password: string) => {
  validatePassword(password);
  return validatePassword.errors;
}
