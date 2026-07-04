import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Honra PORT (lo inyecta el gestor de preview); sin él, Vite usa 5173 por defecto.
  server: process.env.PORT ? { port: Number(process.env.PORT), strictPort: true } : undefined,
});
