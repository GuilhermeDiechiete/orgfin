// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  css: [
    'bulma/css/bulma.css',
    '~/assets/css/main.css'
  ],
  components: [
    '~/components',
    '~/components/global',
    '~/components/boxUser',
    '~/components/boxNavegationPages',
    '~/components/boxTables',
    '~/components/boxNewTransaction',
    '~/components/boxCategories',
    '~/components/boxAccounts'
  ]
})
