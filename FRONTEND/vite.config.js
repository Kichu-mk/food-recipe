import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_NOT_FOUND') return
        if (warning.message.includes('parse')) return
        if (warning.message.includes('cookie')) return
        warn(warning)
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      ignoreTryCatch: false,
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  }
})