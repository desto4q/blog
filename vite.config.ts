import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
export default defineConfig({
  ssr: {
    noExternal: ["suneditor-react"],
  },
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react",
      jsxImportSource: "react",
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
