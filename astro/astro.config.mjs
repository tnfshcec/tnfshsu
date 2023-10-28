import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";

export default defineConfig({
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    prefetch({
      selector: "a",
    }),
    sitemap(),
  ],
});
