export default {
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },


  css: [
    'bulma/css/bulma.css', 
    '@/assets/css/main.css'
  ],

  plugins: [],

  components: true,


  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'http://127.0.0.1:4000'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    },
    
  },
}
