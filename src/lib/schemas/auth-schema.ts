import { type JSONSchemaType } from 'ajv';
interface IAuthSchema {
  user_id: string;
  password: string;
}

const AuthSchema: JSONSchemaType<IAuthSchema> = {
  type: 'object',
  properties: {
    user_id: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['user_id', 'password'],
  additionalProperties: false,
};
export default AuthSchema;
