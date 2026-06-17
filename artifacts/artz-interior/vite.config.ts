import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import Sitemap from "vite-plugin-sitemap";

const port = Number(process.env.PORT ?? "5178");
const basePath = process.env.BASE_PATH ?? "/";

// Sitemap configuration
const siteUrl = "https://artinteriorz.com";
const routes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/contact",
  "/blog",
  "/calculator",
  "/calculator/full-home",
  "/calculator/kitchen",
  "/calculator/wardrobe"
];

export default defineConfig({
  base: basePath,
  plugins: [
    react(), 
    tailwindcss(),
    Sitemap({
      hostname: siteUrl,
      dynamicRoutes: routes,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "public", "assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: { strict: false },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
