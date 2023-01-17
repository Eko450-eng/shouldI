/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: true,
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["documentinatordb.ddns.net", "87.155.172.252"]
  },
  experimental: {
    appDir: true
  }
})
