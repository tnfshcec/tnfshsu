import IconSelector from "@/components/IconSelector";
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
      required: true,
    },
    {
      name: "icon",
      type: "text",
      required: true,
      admin: {
        description:
          "Use this field to search for icons. Refer to https://icones.js.org/collection/mdi for available icons. Icon preview may be added later.",
        components: {
          Field: (props) =>
            IconSelector({
              ...props,
              icons: [
                {
                  label: "秘書",
                  value: "mdi:fountain-pen-tip",
                },
                {
                  label: "活動",
                  value: "mdi:volleyball",
                },
                {
                  label: "公關",
                  value: "mdi:account-group",
                },
                {
                  label: "財政",
                  value: "mdi:currency-usd",
                },
                {
                  label: "主計",
                  value: "mdi:text-box-multiple",
                },
                {
                  label: "學權",
                  value: "mdi:bullhorn",
                },
              ],
            }),
        },
      },
    },
    {
      name: "overview",
      type: "text",
      required: true,
      maxLength: 60,
    },
    {
      name: "description",
      required: true,
      type: "richText",
    },
  ],
};

export default Departments;
