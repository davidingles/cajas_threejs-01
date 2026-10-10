/**
 * Servidor estático mínimo para ver el visor en local.
 *
 * Sirve la carpeta del proyecto. No tiene dependencias: solo módulos nativos
 * de Node.js. Es necesario porque los módulos ES no funcionan abriendo el
 * archivo con doble clic (file://).
 *
 *   node tools/serve.mjs          ->  http://localhost:5173
 *   node tools/serve.mjs 8080     ->  http://localhost:8080
 */
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const PORT = Number(process.argv[2] || process.env.PORT || 5173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ktx2': 'image/ktx2',
  '.hdr': 'image/vnd.radiance',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname.endsWith('/')) pathname += 'index.html';

  const target = resolve(join(ROOT, normalize(pathname)));
  if (target !== ROOT && !target.startsWith(ROOT + sep)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('403 Prohibido');
    return;
  }

  try {
    const info = await stat(target);
    if (info.isDirectory()) {
      response.writeHead(301, { Location: url.pathname + '/' });
      response.end();
      return;
    }

    response.writeHead(200, {
      'Content-Type': MIME[extname(target).toLowerCase()] || 'application/octet-stream',
      'Content-Length': info.size,
      // Sin caché: al recargar siempre se ve la última versión.
      'Cache-Control': 'no-store, must-revalidate',
    });

    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('404 No encontrado');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Visor disponible en  http://localhost:${PORT}`);
  console.log(`Sirviendo            ${ROOT}`);
  console.log('Pulsa Ctrl+C para parar.');
});
