import { defineField, defineType } from "sanity";

export default defineType({
  name: "deliveryAndReturn",
  type: "document",
  title: "Delivery and Return",
  fields: [
    defineField({
      name: "deliveries",
      title: "Deliveries",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "returns",
      title: "Returns",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
