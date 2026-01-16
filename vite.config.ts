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
          pruneSource: true, // Remove inlined CSS from external file
          compress: true,
          minimumExternalSize: 5000, // Inline CSS smaller than 5KB
          reduceInlineStyles: false, // Keep all critical CSS
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
        manualChunks(id) {
          // React core (highest priority - loaded first)
          if (id.includes('react') || id.includes('react-dom')) {
            if (id.includes('react-router')) return 'vendor-router';
            return 'vendor-react';
          }

          // UI components (frequently reused)
          if (id.includes('@radix-ui')) {
            return 'vendor-radix';
          }

          // Icons (heavy library)
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }

          // Form handling (only used on contact form)
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'vendor-forms';
          }

          // Query/state management
          if (id.includes('@tanstack/react-query')) {
            return 'vendor-query';
          }

          // Image comparison library (only on specific pages)
          if (id.includes('react-compare-image') || id.includes('embla-carousel')) {
            return 'vendor-media';
          }

          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        passes: 2, // More aggressive compression
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
      },
      mangle: {
        safari10: true, // Better Safari compatibility
      },
    },
    chunkSizeWarningLimit: 600, // Warn if chunks exceed 600KB
  },
}));
