/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: true,
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["documentinatordb.ddns.net", "shouldi.fly.dev"]
  },
  experimental: {
    appDir: true
  }
})
