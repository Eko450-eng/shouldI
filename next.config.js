/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: true,
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["documentinatordb.ddns.net", "shouldi.fly.dev", "localhost", "192.168.0.161", "pbdb.shouldi.online"]
  },
  experimental: {
    appDir: true
  }
})
