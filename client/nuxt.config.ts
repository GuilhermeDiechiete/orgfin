// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['nuxt-icon'],

  
  
  css: [
    'bulma/css/bulma.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/css/main.css',
    '~/assets/css/bg-color.css',
    '~/assets/css/text-color.css'
  ],

  


  components: [
    '~/components',
    '~/components/fragments',
    '~/components/fragments/icons',
    '~/components/items',
    '~/components/boxes',
    '~/components/shelves',
  ]
})
