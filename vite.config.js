import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const isDevMode = mode.toLowerCase() === 'development';

    return {
        plugins: [svelte()],
        server: {
            host: isDevMode ? '127.0.0.1' : '::',
            port: 3000,
        },
        build: {
            target: isDevMode ? ['esnext'] : ['es2015'],
        },
    };
});
