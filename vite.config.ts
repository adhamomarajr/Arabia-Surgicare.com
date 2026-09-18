import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import healthHandler from './api/health.ts';
import doctorsHandler from './api/doctors.ts';
import adminLoginHandler from './api/admin/login.ts';
import adminNotifyHandler from './api/admin/notify.ts';

function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        await new Promise((resolve) => req.on('end', resolve));

        try {
          (req as any).body = body ? JSON.parse(body) : {};
        } catch {
          (req as any).body = body;
        }

        (res as any).status = (statusCode: number) => {
          res.statusCode = statusCode;
          return {
            json: (data: any) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            },
            end: () => res.end(),
          };
        };
        (res as any).json = (data: any) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        const url = req.url.split('?')[0];
        if (url === '/api/health') {
          return healthHandler(req, res);
        }
        if (url === '/api/doctors') {
          return doctorsHandler(req, res);
        }
        if (url === '/api/admin/login') {
          return adminLoginHandler(req, res);
        }
        if (url === '/api/admin/notify') {
          return adminNotifyHandler(req, res);
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiMiddlewarePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
