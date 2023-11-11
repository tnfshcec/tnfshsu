import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import Posts from "@/collections/Posts";
import Users from "@/collections/Users";
import Media from "@/collections/Media";
import { webpackBundler } from "@payloadcms/bundler-webpack";

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
  collections: [Posts, Users, Media],
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
  typescript: {
    outputFile: path.resolve("/", "types.ts"),
  },
});
