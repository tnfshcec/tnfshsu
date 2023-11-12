import { CollectionConfig } from "payload/types";

const Departments: CollectionConfig = {
  slug: "departments",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "icon",
      // TODO: custom icon picker with type "text"
      type: "select",
      options: [
        {
          label: "秘書",
          value: "mdi_fountain-pen-tip",
        },
        {
          label: "活動",
          value: "mdi_volleyball",
        },
        {
          label: "公關",
          value: "mdi_account-group",
        },
        {
          label: "財政",
          value: "mdi_currency-usd",
        },
        {
          label: "主計",
          value: "mdi_text-box-multiple",
        },
        {
          label: "學權",
          value: "mdi_bullhorn",
        },
      ],
    },
    {
      name: "overview",
      type: "text",
      maxLength: 60,
    },
    {
      name: "description",
      type: "richText",
    },
  ],
};

export default Departments;
