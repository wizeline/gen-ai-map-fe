import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/gen-ai-map-fe/",
  plugins: [
    remix({
      basename: "/gen-ai-map-fe/",
      ssr: false,
    }),
    tsconfigPaths(),
  ],
});
