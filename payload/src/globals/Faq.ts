import type { GlobalConfig } from "payload/types";

const Faq: GlobalConfig = {
  slug: "faq",
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
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default Faq;
