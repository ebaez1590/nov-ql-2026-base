import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // Escucha y muestra http://127.0.0.1:5173 en lugar de "localhost",
    // porque en esta máquina "localhost" intenta primero IPv6 (::1)
    // y el navegador no logra conectarse.
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
  },
});
