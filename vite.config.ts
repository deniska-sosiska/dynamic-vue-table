import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
    server: {
        port: 8080,
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
    },
    plugins: [
        vue({}),
        legacy({ targets: ['> 0.05%'] }),
        checker({
            vueTsc: true,
            eslint: { lintCommand: 'eslint ./src --ext .js,.ts,.vue' },
            overlay: false,
        }),
    ],
});
