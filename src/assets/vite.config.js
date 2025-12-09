// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Pastikan 'base' disetel ke '/' atau dikomentari/dihapus
export default defineConfig({
  plugins: [react()],
  // base: '/', // Ini biasanya tidak perlu jika Anda tidak mendeploy ke sub-path
})
