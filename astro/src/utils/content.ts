import { Element } from "domhandler";
import { slateToHtml } from "@slate-serializers/html";
import { payloadSlateToDomConfig, type ElementTransform } from "@slate-serializers/dom";

import type { Media, Post } from "@/types";

const payload = import.meta.env.PAYLOAD_URL;

export const getImageSrc = (src: string) => `${payload}/media/${src}`;

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
