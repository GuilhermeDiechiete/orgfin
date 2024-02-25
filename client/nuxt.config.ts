// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['nuxt-icon', '@pinia/nuxt'],

  
  
  css: [
    'bulma/css/bulma.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/css/main.css',
    '~/assets/css/buttons.css',
    '~/assets/css/bg-color.css',
    '~/assets/css/text-color.css',
    '~/assets/css/table.css',
  ],

  


  components: [
    '~/components',
    '~/components/global',
    '~/components/templates',

    '~/components/boxes',
    '~/components/boxes/TIndex',
    '~/components/boxes/TAccounts',
    '~/components/boxes/TCategories',
    '~/components/boxes/TLogin',
    '~/components/boxes/TRegister',

    '~/components/utils',

    '~/components/tables',
    '~/components/tables/bars',

    '~/components/selects',
    '~/components/forms',
    '~/components/buttons',
    '~/components/icons',
    
  ]
});
