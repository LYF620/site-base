/** @type {import('next').NextConfig} */
const withCSS = require('@zeit/next-css')
const LoadablePlugin = require('@loadable/webpack-plugin')
const nextConfig = {
  reactStrictMode: true,
  withCSS,
  cssModules: true,
  plugins: [new LoadablePlugin()],
  react: {
    useSuspense: true,
    wait: true,
  },
}

module.exports = nextConfig
