import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "stats.html",
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-dndkit', test: /\/node_modules\/@dnd-kit/ },
            { name: 'vendor-tanstack', test: /\/node_modules\/@tanstack/ },
            { name: 'vendor-ui', test: /\/node_modules\/@headlessui/ },
            { name: 'vendor-react', test: /\/node_modules\/(react|react-dom|react-router)/ },
            { name: 'vendor', test: /\/node_modules\// }, // catch-all para el resto
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
