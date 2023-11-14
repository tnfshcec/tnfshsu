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
      required: true,
    },
    {
      name: "department",
      type: "relationship",
      relationTo: "departments",
      required: true,
      admin: { allowCreate: false },
    },
    {
      // INFO: saved as space-delimited text,
      // which is not ideal - good enough (i guess)
      name: "tags",
      type: "text",
      required: true,
      admin: {
        components: { Field: TagInput },
        placeholder: "Type in tags... (Submit by Enter or Space)"
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};

export default Posts;
