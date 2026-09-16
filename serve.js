const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4173;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  let reqPath = decodeURI(reqUrl);

  // Root redirect
  if (reqPath === '/') {
    res.writeHead(307, { 'Location': '/demo/unofficial-clothing' });
    res.end();
    return;
  }

  // Relative asset rewrite for /demo/css and /demo/js when accessed from /demo/:client
  if (reqPath.startsWith('/demo/css/')) {
    reqPath = '/demo/unofficial-clothing' + reqPath.substring(5);
  } else if (reqPath.startsWith('/demo/js/')) {
    reqPath = '/demo/unofficial-clothing' + reqPath.substring(5);
  }

  // Generic /demo/:client or /demo/:client/ -> serve demo/:client/index.html
  const clientMatch = reqPath.match(/^\/demo\/([^\/\.]+)\/?$/);
  if (clientMatch) {
    reqPath = `/demo/${clientMatch[1]}/index.html`;
  }

  // Directory handling with trailing slash -> index.html
  let filePath = path.join(ROOT, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
  console.log(`Unofficial Clothing Demo at: http://127.0.0.1:${PORT}/demo/unofficial-clothing/`);
});
