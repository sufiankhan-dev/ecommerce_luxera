import { defineField, defineType } from "sanity";

export default defineType({
  name: "womensCollections",
  title: "Womens Collection",
  type: "document",
  fields: [
    defineField({
      name: "collectionName",
      type: "string",
      title: "Collection Name",
    }),
    defineField({
      name: "collectionSlug",
      title: "Collection slug",
      type: "slug",
      options: {
        source: "collectionName",
        slugify: (input) => `women/${input.toLowerCase().replace(/\s+/g, "-")}`,
      },
    }),
  ],
});
