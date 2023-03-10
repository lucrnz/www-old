import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const isDevMode = mode.toLowerCase() === 'development';

    return {
        plugins: [svelte()],
        resolve: {
            alias: {
                $assets: resolve('./src/assets'),
                $config: resolve('./src/config'),
                $lib: resolve('./src/lib'),
                $pages: resolve('./src/pages'),
                $types: resolve('./src/types'),
                $util: resolve('./src/util'),
            },
        },
        server: {
            host: isDevMode ? '127.0.0.1' : '::',
            port: 3000,
            proxy: isDevMode
                ? {
                      '/image': {
                          target: 'http://localhost:8000/',
                          changeOrigin: true,
                          secure: false,
                      },
                      '/api': {
                          target: 'http://localhost:8000/',
                          changeOrigin: true,
                          secure: false,
                      },
                  }
                : undefined,
        },
    };
});
