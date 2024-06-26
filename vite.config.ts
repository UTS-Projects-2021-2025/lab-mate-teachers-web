import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
            '@pages': path.resolve(__dirname, '/src/pages'),
            '@components': path.resolve(__dirname, '/src/components'),
            '@data': path.resolve(__dirname, '/src/data'),
            '@assets': path.resolve(__dirname, '/src/assets'),
            '@images': path.resolve(__dirname, '/src/assets/images'),
        },
    },
});
