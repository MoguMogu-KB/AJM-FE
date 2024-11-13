import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        "name": "안전모",
        "short_name": "안전모",
        "icons": [
          {
            "src": "/icons/AJM.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/icons/AJM.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
        ],
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#ffffff"
      },
      workbox: {
        runtimeCaching: [{
                urlPattern: /\.ico$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'ico-cache',
                    expiration: {
                        maxEntries: 10, 
                        maxAgeSeconds: 60 * 60 * 24 * 365,  
                    }
                }
            },
            {
                urlPattern: /\.json$/,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'json-cache',
                    cacheableResponse: {
                        statuses: [200]
                    }
                },
            }
        ],
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
