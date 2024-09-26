import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime', // Cấu hình alias để resolve react/jsx-runtime
    },
  },
})
