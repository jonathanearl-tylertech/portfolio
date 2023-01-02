import Ajv, { type JSONSchemaType } from 'ajv';
const ajv = new Ajv({ allErrors: true });

interface CreatePost {
  title: string;
  content: string;
  published: boolean;
}

const createPostSchema: JSONSchemaType<CreatePost> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 3,
      maxLength: 40,
    },
    content: {
      type: 'string',
      maxLength: 2000,
    },
    published: {
      type: 'boolean',
    }
  },
  required: ['title', 'published'],
};

const validateCreatePost = ajv.compile(createPostSchema);


export const isCreatePost = (createUser: any) => {
  validateCreatePost(createUser);
  console.log(validateCreatePost.errors);
  return validateCreatePost.errors;
}
