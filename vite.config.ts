import path from 'path';
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@engine": path.resolve(__dirname, './packages/engine'),
      "@editor": path.resolve(__dirname, './packages/editor'),
    },
  },
});
