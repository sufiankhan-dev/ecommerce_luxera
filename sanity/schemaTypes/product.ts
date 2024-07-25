import { defineField, defineType } from "sanity";
import { ColorInput } from "@sanity/color-input";

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
      name: "sizes",
      type: "array",
      title: "Available Sizes",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Small", value: "S" },
          { title: "Medium", value: "M" },
          { title: "Large", value: "L" },
          { title: "Extra Large", value: "XL" },
        ],
      },
    }),
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [{ type: "string" }],
      description: "Enter hex color codes (e.g., #ff5733).",
    }),
    defineField({
      name: "description",
      title: "Description of Product",
      type: "text",
    }),
    defineField({
      name: "fit",
      title: "Product Fit",
      type: "string",
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
      validation: (Rule) => Rule.required(),
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      validation: (Rule) => Rule.required(),
      type: "number",
    }),
    defineField({
      name: "salePercent",
      title: "Sale Percent",
      type: "number",
      description: "% of sale",
    }),
    defineField({
      name: "price_id",
      title: "Stripe price ID",
      validation: (Rule) => Rule.required(),
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "collection",
      title: "Collection",
      validation: (Rule) => Rule.required(),
      description: "Select collection according to the category of the product",
      type: "reference",
      to: [{ type: "mensCollections" }, { type: "womensCollections" }],
    }),
    defineField({
      name: "collectionSlug",
      title: "Collection Slug",
      type: "slug",
      description:
        "Must add this according to the nme of collection for some reasons auto generate is not working for spaces use (-) and for this & use (and)",
      validation: (Rule) => Rule.required(),
      options: {
        source: "collection",
        maxLength: 96,
      },
    }),
  ],
});
