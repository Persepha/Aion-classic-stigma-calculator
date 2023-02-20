/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = withPlugins([
  [
    withImages,
    {
      assetPrefix: "/Aion-classic-stigma-calculator/",
    },
  ],
  {
    reactStrictMode: true,
    trailingSlash: true,
    basePath: "/Aion-classic-stigma-calculator",
    assetPrefix: "/Aion-classic-stigma-calculator/",
  },
]);

module.exports = nextConfig;
