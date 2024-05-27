/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  pageExtensions: [
    "page.tsx",
    "page.ts",
    "page.jsx",
    "page.js",
    "_app.tsx",
    "_app.jsx",
    "_app.js",
    "_document.tsx",
    "_document.jsx",
    "_document.ts",
    "_document.js",
  ],
};
