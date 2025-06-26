import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto hace que el servidor sea accesible desde la red local
    port: 5173 // Puedes especificar un puerto si lo deseas
  }
});