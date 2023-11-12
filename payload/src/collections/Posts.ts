import TagInput from "@/components/TagInput";
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
      type: "relationship",
      relationTo: "departments",
      admin: { allowCreate: false },
    },
    {
      // INFO: saved as space-delimited text,
      // which is not ideal - good enough (i guess)
      name: "tags",
      type: "text",
      admin: {
        components: { Field: TagInput },
      },
    },
    {
      name: "content",
      type: "richText",
    },
  ],
};

export default Posts;
