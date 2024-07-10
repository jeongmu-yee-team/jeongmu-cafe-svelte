import { type JSONSchemaType } from 'ajv';

export interface IProductSchema {
  product_id: number;
  product_name: string;
  product_thumbnail_url: string;
  product_price: number;
  product_type_id: number;
}

export const ProductSchema: JSONSchemaType<IProductSchema> = {
  type: 'object',
  properties: {
    product_id: { type: 'number' },
    product_name: { type: 'string' },
    product_thumbnail_url: { type: 'string' },
    product_price: { type: 'number' },
    product_type_id: { type: 'number' },
  },
  required: ['product_id', 'product_name', 'product_thumbnail_url', 'product_price', 'product_type_id'],
  additionalProperties: false,
};

/** POST Schema = PUT Schema */
