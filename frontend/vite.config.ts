import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
  },
  plugins: [react()],
  build: {
    outDir: "../serveApp/web/static/",
    manifest: true,
  },
});
