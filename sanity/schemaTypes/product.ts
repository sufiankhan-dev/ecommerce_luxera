import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name of Product",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "description",
      title: "Description of Product",
      type: "text",
    }),
    defineField({
      name: "compositionAndCare",
      title: "Composition and Care",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "slug",
      title: "Product slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "price_id",
      title: "Stripe price ID",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
  ],
});
