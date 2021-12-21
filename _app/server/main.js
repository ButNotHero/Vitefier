const path = require('path');
const nodeFetch = require('node-fetch');
const express = require('express');

// @ts-ignore
global.fetch = nodeFetch;

const dist = '../dist';

// This contains a list of static routes (assets)
/** @type {import('../dist/server/package.json')} */
const {
  ssr: { assets },
} = require(`${dist}/server/package.json`);

/** @type {import('../dist/client/ssr-manifest.json')} */
const manifest = require(`${dist}/client/ssr-manifest.json`);

// This is the server renderer we just built
/** @type { import('../dist/server/main')} */
const { default: renderPage } =
  /* @ts-ignore */
  require(`${dist}/server`);

const server = express();

for (const asset of assets || []) {
  server.use(
    `/${asset}`,
    express.static(path.join(__dirname, `${dist}/client/${asset}`), {
      maxAge: '24h',
    }),
  );
}

server.get('*', async (request, response) => {
  try {
    const url = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const { html, status, statusText, headers } = await renderPage(url, {
      manifest,
      preload: true,
      request,
      response,
    });

    response.writeHead(status || 200, statusText || headers, headers);
    response.end(html);
  } catch (e) {
    console.error(e);
  }
});

const port = process.env.PORT || 9191;
console.log(`Server started: http://localhost:${port}`);
server.listen(port);
