import { GlobalConfig } from "payload/types";

const FAQ: GlobalConfig = {
  slug: "faq",
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [{
    name: "entries",
    type: "array",
    fields: [
      {
        name: "question",
        type: "text"
      },
      {
        name: "answer",
        type: "text"
      }
    ]
  }]
}

export default FAQ;
