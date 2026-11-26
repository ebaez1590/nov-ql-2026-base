import { defineConfig } from 'vitest/config';

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
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
    // Procesa los CSS para que `style.css?raw` llegue con su contenido a las pruebas
    // de tema-visual (por defecto Vitest los reemplaza por un texto vacío).
    css: true,
  },
});
