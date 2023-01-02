import Ajv, { type JSONSchemaType } from 'ajv';
import { passwordSchema } from './password';
import { usernameSchema } from './username';

const ajv = new Ajv({ allErrors: true });

interface Credentials {
  username: string;
  password: string;
}

const credentialsSchema: JSONSchemaType<Credentials> = {
  type: 'object',
  properties: {
    username: usernameSchema,
    password: passwordSchema,
  },
  required: ['username', 'password'],
};

const validateCredentials = ajv.compile(credentialsSchema);


export const isCredentials = (credentials: Credentials) => {
  validateCredentials(credentials);
  console.log(validateCredentials.errors);
  return validateCredentials.errors;
}
