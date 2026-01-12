import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Critters from "critters";

// Vite plugin for critical CSS inlining
function criticalCSSPlugin() {
  return {
    name: 'vite-plugin-critters',
    apply: 'build' as const,
    enforce: 'post' as const,
    async closeBundle() {
      const fs = await import('fs/promises');
      const distPath = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distPath, 'index.html');

      try {
        const html = await fs.readFile(indexPath, 'utf-8');

        const critters = new Critters({
          path: distPath,
          publicPath: '/',
          preload: 'swap',
          noscriptFallback: true,
          inlineFonts: false,
          pruneSource: false,
          compress: true,
          logLevel: 'info',
        });

        const inlined = await critters.process(html);
        await fs.writeFile(indexPath, inlined);
        console.log('✅ Critical CSS inlined successfully');
      } catch (error) {
        console.warn('⚠️  Critters critical CSS inlining failed:', error);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && criticalCSSPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react', '@radix-ui/react-slot'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
}));
