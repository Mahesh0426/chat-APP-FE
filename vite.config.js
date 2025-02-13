import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx)$/, // Treat both .js and .jsx files as JSX
    }),
    tailwindcss(),
  ],
});
