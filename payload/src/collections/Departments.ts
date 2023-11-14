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
    },
    {
      name: "icon",
      // TODO: custom icon picker with type "text"
      type: "text",
      admin: {
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
      maxLength: 60,
    },
    {
      name: "description",
      type: "richText",
    },
  ],
};

export default Departments;
