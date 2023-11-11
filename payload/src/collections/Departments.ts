import { CollectionConfig } from "payload/types";

const Departments: CollectionConfig = {
  slug: "departments",
  admin: {
    useAsTitle: "name"
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text"
    },
    {
      name: "overview",
      type: "text",
      maxLength: 60
    },
    {
      name: "description",
      type: "richText",
    }
  ],
};

export default Departments;
