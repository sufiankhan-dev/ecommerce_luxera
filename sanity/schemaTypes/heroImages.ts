import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroImage",
  type: "document",
  title: "Hero Images",
  fields: [
    defineField({
      name: "image1",
      type: "image",
      title: "First Image",
    }),
    defineField({
      name: "image2",
      type: "image",
      title: "Second Image",
    }),
    defineField({
      name: "image3",
      type: "image",
      title: "Third Image",
    }),
  ],
});
