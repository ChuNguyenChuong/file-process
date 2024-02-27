import million from "million/compiler";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [million.vite({
    auto: {
      threshold: 0.05, // default: 0.1,
      skip: ['useBadHook', /badVariable/g], // default []
    }
  }), react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // Here
    strictPort: true,
    port: 5173,
  }
});