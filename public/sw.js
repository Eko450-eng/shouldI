if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-7028bf80"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/aKXwmRCrPjUL68EY771P3/_buildManifest.js",revision:"8097d1f303c5f6713030e8742661e650"},{url:"/_next/static/aKXwmRCrPjUL68EY771P3/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/116-ec24432d1992cbde.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/206-e5aaafb2ad851437.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/383-8bcc15cb99c2db0c.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/386-bc99fc61bfaa008a.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/40-6578c9b78aa986ee.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/486-841abcd088dfddd1.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/55-9f2d7001f7538cd1.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/604-c0d8d6c959ba2eed.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/670-1076c1b9a0758199.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/706-eed218d7f3859277.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/912-1e70e346250f37b9.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/app/Signin/page-45b23a3edde87950.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/app/head-371f4e5d3ca25551.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/app/layout-c602342097184294.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/app/myquestions/%5Buser%5D/page-85e2c5c39f5ec39f.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/app/myquestions/newquestion/page-3d0d282f6e0db853.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/app/page-e7455e186ec2f577.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/app/questions/%5Bquestion%5D/page-b4d38ed669897969.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/app/settings/%5Buser%5D/page-8c0a1c298f99a8f8.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/bcf6444a-05ad7ace12daf4be.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/main-53f3eb0d2ff317f2.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/main-app-ebfd2ccf9a8a7912.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/pages/_app-da7e799fb2175764.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/pages/_error-8008c699f3d4755b.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-1293222e00a0b029.js",revision:"aKXwmRCrPjUL68EY771P3"},{url:"/_next/static/css/a4c6054a668a8a38.css",revision:"a4c6054a668a8a38"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:s})=>{if(!e)return!1;const n=s.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e,sameOrigin:s})=>!!s&&!e.pathname.startsWith("/api/")),new e.NetworkFirst({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
