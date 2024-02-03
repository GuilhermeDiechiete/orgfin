// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt'
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

  components: [
    '~/components', 
    '~/components/buttons', 
    '~/components/form',  
    '~/components/notifications',
    '~/components/tables',
  ],


  css: [
    'bulma/css/bulma.css', 
    '@/assets/css/bg-color.css',
    '@/assets/css/text-color.css']
  
}

  
);
