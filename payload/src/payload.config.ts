import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import addLastModified from "./plugins/lastModified";

import Posts from "@/collections/Posts";
import Departments from "@/collections/Departments";
import Users from "@/collections/Users";
import Media from "@/collections/Media";
import FAQ from "@/globals/faq";

export default buildConfig({
  serverURL: process.env.PAYLOAD_URL,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@": path.resolve(__dirname, "./"),
        },
      },
    }),
  },
  collections: [Posts, Departments, Users, Media],
  globals: [FAQ],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  editor: slateEditor({
    admin: {
      elements: ["h2", "h3", "h4", "link", "ol", "ul", "upload"],
      leaves: ["bold", "italic", "underline"],
      upload: {
        collections: {
          media: {
            fields: [
              {
                name: "image",
                type: "upload",
                relationTo: "media",
                required: true,
              },
            ],
          },
        },
      },
    },
  }),
  plugins: [addLastModified({ usersCollection: "users" })],
  typescript: {
    outputFile: path.resolve("/", "types.ts"),
  },
});
