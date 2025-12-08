/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverDependenciesToBundle: [/^@web3jskit\/.*/],
  serverModuleFormat: "esm",
  server: {
    port: 5173,
    proxy: {
      "xscscan.com/api/**": {
        target: "https://xscscan.com",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/api/",
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "x-token, Content-Type",
        },
      },
    },
  },
};
