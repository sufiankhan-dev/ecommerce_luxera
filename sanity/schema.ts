import { type SchemaTypeDefinition } from "sanity";
import product from "./schemaTypes/product";
import category from "./schemaTypes/category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category],
};
