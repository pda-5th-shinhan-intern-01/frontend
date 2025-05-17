import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
import path from "path";
// .env 파일에서 환경변수 불러오기
dotenv.config({ path: path.resolve(__dirname, ".env") });

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api/hello -> http://localhost:8080/hello
      },
    },
  },
  base: './',
});
