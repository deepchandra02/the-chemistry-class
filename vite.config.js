import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Always serve on port 3000 (fail instead of falling back to another port)
// and open the browser automatically.
const serve = {
  port: 3000,
  strictPort: true,
  open: true,
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: serve,
  preview: serve,
})
