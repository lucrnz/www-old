import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const isDevMode = mode.toLowerCase() === 'development';

    return {
        plugins: [
            svelte({
                preprocess: [
                    sveltePreprocess({
                        scss: true,
                        typescript: true,
                    }),
                ],
            }),
        ],
        server: {
            host: isDevMode ? '127.0.0.1' : '::',
            port: 3000,
        },
    };
});
