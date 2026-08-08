import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Plain single-app Vite config. No dev proxy needed — the site has no backend
// (the consultation form submits via a prefilled mailto).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
