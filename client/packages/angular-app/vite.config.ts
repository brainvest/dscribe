import { fileURLToPath, URL } from 'node:url';
import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// `vite` (serve) runs in "development" mode; `vite build` runs in "production" mode.
export default defineConfig(({ mode }) => ({
  publicDir: 'public',
  resolve: {
    alias: {
      // Consume the library from source so the app does not need a prior ng-packagr build.
      '@waltzar/angular-lib': fromRoot('./projects/waltzar/angular-lib/src/public-api.ts'),
    },
  },
  plugins: [
    angular({
      tsconfig: fromRoot('./tsconfig.app.json'),
      inlineStylesExtension: 'scss',
      fileReplacements:
        mode === 'development'
          ? [
              {
                replace: 'src/environments/environment.ts',
                with: 'src/environments/environment.development.ts',
              },
            ]
          : [],
    }),
  ],
  optimizeDeps: {
    exclude: ['@waltzar/core'],
  },
  server: {
    port: 4200,
    proxy: {
      '/auth': { target: 'http://localhost:5001', secure: false, changeOrigin: true },
      '/api': { target: 'http://localhost:5000', secure: false, changeOrigin: true },
    },
  },
  preview: {
    port: 4200,
  },
  build: {
    outDir: 'dist/ui-template',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: mode === 'development',
  },
}));
