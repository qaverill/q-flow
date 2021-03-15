/** @type {import("snowpack").SnowpackUserConfig } */
const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({ target: 'http://localhost:4040' });

module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    /* ... */
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    '@q': './src/packages',
  },
  experiments: {
    routes: [
      {
        src: '/api/.*',
        dest: (req, res) => proxy.web(req, res),
      },
    ],
  },
};
