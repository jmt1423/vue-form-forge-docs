// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://vueformforge.com/",
  integrations: [
    starlight({
      title: "Form Forge Docs",
      favicon: "/favicon.svg",
      head: [
        // Add ICO favicon fallback for Safari.
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.ico",
            sizes: "32x32",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/jmt1423/vue-form-forge",
        },
      ],
      sidebar: [
        {
          label: "Core",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Installation", slug: "core/installation" },
            { label: "Theming", slug: "core/theming" },
            { label: "AI Assistant", slug: "core/ai-assistant" },
            { label: "UI Components", slug: "core/ui-components" },
            { label: "Rendering Forms", slug: "core/rendering-forms"},
            { label: "Default Items and Pro Inputs", slug: "core/pro-inputs" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
      customCss: ["./src/styles/global.css"],
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
