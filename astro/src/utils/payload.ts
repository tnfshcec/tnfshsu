import type { Media, Post } from "@/types";
import { Element } from "domhandler";
import { slateToHtml } from "@slate-serializers/html";
import {
  payloadSlateToDomConfig,
  type ElementTransform,
} from "@slate-serializers/dom";

const externalUrl = import.meta.env.PAYLOAD_URL;

const url = import.meta.env.DEV ? "http://payload:3001" : externalUrl;

export const getPosts = async () =>
  (await (await fetch(`${url}/api/posts`)).json()).docs as Post[];

export const getPost = async (id: string) =>
  (await (await fetch(`${url}/api/posts/${id}`)).json()) as Post;

export const getImageSrc = (src: string) => `${externalUrl}/media/${src}`;

const upload: ElementTransform = ({ node }: { node?: { value: Media } }) => {
  if (!node || !node.value.filename) return undefined;

  return new Element("img", {
    src: getImageSrc(node.value.filename),
    width: `${node.value.width}`,
    height: `${node.value.height}`,
    alt: node.value.alt ?? "",
    decoding: "async",
    loading: "lazy",
  });
};

let payloadConfig = payloadSlateToDomConfig;
payloadConfig.elementTransforms.upload = upload;

export const getContent = (content: NonNullable<Post["content"]>) => {
  return slateToHtml(content, payloadConfig);
};
