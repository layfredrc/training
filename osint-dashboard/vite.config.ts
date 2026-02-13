import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Utilise describe, test, expect sans import
        environment: 'jsdom', // Simule un browser
        setupFiles: './src/test/setup.ts', // Setup global
        css: true, // Parse les imports CSS
        coverage: {
            provider: 'v8', // Coverage avec V8
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'node_modules/',
                'src/test/**',
                'src/main.tsx',
                'src/vite-env.d.ts',
            ],
        },
    },
})
