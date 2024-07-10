import { type JSONSchemaType } from 'ajv';

export interface IPostAuthSchema {
  user_id: string;
  password: string;
}

export const PostAuthSchema: JSONSchemaType<IPostAuthSchema> = {
  type: 'object',
  properties: {
    user_id: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['user_id', 'password'],
  additionalProperties: false,
};
