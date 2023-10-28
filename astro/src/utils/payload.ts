import type { Post } from "@/types";
import { Element } from "domhandler";
import { slateToHtml } from "@slate-serializers/html";
import {
  payloadSlateToDomConfig,
  type SlateToDomConfig,
} from "@slate-serializers/dom";

const externalUrl = import.meta.env.PAYLOAD_URL;

const url = import.meta.env.DEV ? "http://payload:3001" : externalUrl;

export const getPosts = async () =>
  (await (await fetch(`${url}/api/posts`)).json()).docs as Post[];

export const getPost = async (id: string) =>
  (await (await fetch(`${url}/api/posts/${id}`)).json()) as Post;

export const getImageSrc = (src: string) => `${externalUrl}/media/${src}`;

const payloadConfig: SlateToDomConfig = {
  ...payloadSlateToDomConfig,
  elementTransforms: {
    ...payloadSlateToDomConfig.elementTransforms,
    upload: ({ node }) =>
      new Element("img", {
        src: getImageSrc(node.value.filename),
        width: `${node.value.width}`,
        height: `${node.value.height}`,
        alt: node.value.alt,
        decoding: "async",
        loading: "lazy",
      }),
  },
};

export const getContent = (content: any) => {
  return slateToHtml(content, payloadConfig);
};
