import type { JSONSchemaType } from 'ajv';

export interface IOrderSchema {
  product_id: number;
  option_id: number;
  memo: string;
}

export const PostOrderSchema: JSONSchemaType<IOrderSchema[]> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      product_id: { type: 'number' },
      option_id: { type: 'number' },
      memo: { type: 'string' },
    },
    required: ['product_id', 'option_id'],
  },
};
