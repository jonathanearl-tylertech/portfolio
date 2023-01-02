import Ajv, { type JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
export const EMAIL_REQUIRED_ERROR = "Email is required";
export const EMAIL_PATTERN_ERROR = "Email must be a valid address... example@gmail.com";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
// ajv.addFormat("email", /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)

export const emailSchema: JSONSchemaType<string> = {
  type: 'string',
  format: 'email',
};

const validateEmail = ajv.compile(emailSchema);

export const isEmail = (email: string) => {
  validateEmail(email);
  console.log('emailerros', validateEmail.errors)
  return validateEmail.errors;
}
