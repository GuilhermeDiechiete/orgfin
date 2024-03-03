


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'


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
      icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
      },
  })
  app.vueApp.use(vuetify)
})
