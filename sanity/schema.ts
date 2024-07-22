import { type SchemaTypeDefinition } from "sanity";
import product from "./schemaTypes/product";
import category from "./schemaTypes/category";
import heroImages from "./schemaTypes/heroImages";
import deliveryAndReturn from "./schemaTypes/deliveryAndReturn";
import mensCollection from "./schemaTypes/mensCollection";
import womensCollection from "./schemaTypes/womensCollection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    category,
    heroImages,
    deliveryAndReturn,
    mensCollection,
    womensCollection,
  ],
};
