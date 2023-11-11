import { CollectionConfig } from "payload/types";
const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    defaultColumns: ["title", "author", "status"],
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "department",
      type: "select",
      options: [
        "Dep1", "Dep2"
      ]
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text" }]
    },
    {
      name: "content",
      type: "richText",
    },
  ],
};

export default Posts;
