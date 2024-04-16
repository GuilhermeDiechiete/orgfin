import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import type { NuxtPage } from 'nuxt/schema'

export default defineNuxtConfig({
  devtools: { enabled: false },
  
  css: [
    '@/assets/css/main.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  
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
    storesDirs: ['./stores/**', './custom-folder/stores/**', './middlewares'],
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
