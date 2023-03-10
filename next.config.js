/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public'
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

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ["documentinatordb.ddns.net", "shouldi.fly.dev", "localhost", "192.168.0.161", "pbdb.shouldi.online"]
//   },
//   experimental: {
//     appDir: true
//   }
// }
