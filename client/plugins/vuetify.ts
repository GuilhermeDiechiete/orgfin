


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
        themes: {
          light: {
            dark: true,
            colors: {
              primary: colors.red.darken1, // #E53935
              secondary: colors.red.lighten4, // #FFCDD2
              
            }
          },
        },
      },
      
  })
  app.vueApp.use(vuetify)
})
