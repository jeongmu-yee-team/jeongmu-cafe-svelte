import { type JSONSchemaType } from 'ajv';

export interface IProductSchema {
  product_name: string;
  product_thumbnail_data_url: string;
  product_price: number;
  product_type_id: number;
}

export const ProductSchema: JSONSchemaType<IProductSchema> = {
  type: 'object',
  properties: {
    product_name: { type: 'string' },
    product_thumbnail_data_url: { type: 'string' },
    product_price: { type: 'number' },
    product_type_id: { type: 'number' },
  },
  required: ['product_name', 'product_thumbnail_data_url', 'product_price', 'product_type_id'],
  additionalProperties: false,
};

export interface IPATCHProductsSchema {
  is_display: boolean;
}

export const PATCHProductsSchema: JSONSchemaType<IPATCHProductsSchema> = {
  type: 'object',
  properties: {
    is_display: { type: 'boolean' },
  },
  required: ['is_display'],
  additionalProperties: false,
};
