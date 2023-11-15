import IconSelector from "@/components/IconSelector";
import type { GlobalConfig } from "payload/types";

const urlRegex = /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const Socials: GlobalConfig = {
  slug: "socials",
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "entries",
      type: "array",
      fields: [
        {
          name: "Name",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          validate: (val) => urlRegex.test(val) ? true : "Url check failed.",
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
                      label: "Instagram",
                      value: "mdi:instagram",
                    },
                    {
                      label: "Facebook",
                      value: "mdi:facebook",
                    },
                    {
                      label: "Tellonym",
                      value: "arcticons:tellonym",
                    },
                    {
                      label: "YouTube",
                      value: "mdi:youtube",
                    },
                  ],
                }),
            },
          },
        },
      ],
    },
  ],
};

export default Socials;
