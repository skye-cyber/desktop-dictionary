import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        react()
    ],
    base: './',
    //root: resolve(__dirname, 'src/ui'),
    //publicDir: resolve(__dirname, 'src/assets'),
    server: {
        port: 40099,
    },
    build: {
        outDir: resolve(__dirname, 'build'),
        emptyOutDir: true,
        rollupOptions: {
            input: resolve(__dirname, 'index.html'),
            //input: resolve(__dirname, 'src/ui/'),
            /*
             * output: {
                // Ensure relative paths in build
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
            */
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/ui/'),
            '@components': resolve(__dirname, 'src/ui/components'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@core': resolve(__dirname, 'src/core'),
            '@main': resolve(__dirname, 'src/main'),
            '@styles': resolve(__dirname, 'src/ui/styles'),
            crypto: require.resolve('crypto-browserify'),
            process: require.resolve('process/browser'),
            fs: require.resolve('browserify-fs'),
            //buffer: require.resolve('buffer/'),
        },
    },
    define: {
        'process.env': {}
    },
    optimizeDeps: {
        include: ['buffer'],
        //force: true
    },
    // Ensure proper React configuration
    esbuild: {
        //jsxInject: `import React from 'react'`
    }
});
