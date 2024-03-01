import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import type { NuxtPage } from 'nuxt/schema'

export default defineNuxtConfig({
  devtools: { enabled: false },

  css: [
    '@/assets/css/main.css'
  ],
  

  build: {
    transpile: ['vuetify'],
  },

  

  // hooks: {
  //   'pages:extend' (pages) {
  //     function setMiddleware (pages: NuxtPage[]) {
  //       for (const page of pages) {
  //         if (/* some condition */ true) {
  //           page.meta ||= {}
  //           // Note that this will override any middleware set in `definePageMeta` in the page
  //           page.meta.middleware = ['auth']
  //         }
  //         if (page.children) {
  //           setMiddleware(page.children)
  //         }
  //       }
  //     }
  //     setMiddleware(pages)
  //   }
  // },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    // outros módulos
  ],
  
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  components: [
    '~/components'
  ]
})
