// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
  
  ],
  components: [
    '~/components', 
    '~/components/tables', 
    '~/components/tables/headers', 
    '~/components/tables/bodies', 
    '~/components/buttons', 
  ],


  css: ['bulma/css/bulma.css']
  
}

  
)
