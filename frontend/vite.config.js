import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // dev backend server, acts as proxy
        // target: 'https://proshop-ecomm-mern-production.up.railway.app', // prod backend server (deployed on Railway)
        changeOrigin: true,
      },
    },
  },
})
