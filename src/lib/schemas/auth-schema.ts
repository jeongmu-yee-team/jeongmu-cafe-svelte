import { type JSONSchemaType } from 'ajv';

/** POST */
export interface IAuthSchema {
  user_id: string;
  password: string;
}

/** POST */
export const AuthSchema: JSONSchemaType<IAuthSchema> = {
  type: 'object',
  properties: {
    user_id: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['user_id', 'password'],
  additionalProperties: false,
};
