/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const customTheme = {
  dark: true,
  colors: {
    background: '#1C1C1E',   // Deep Black-Gray
    surface: '#2C2C2E',      // Dark Charcoal
    primary: '#3A3D5C',      // Deep Indigo
    secondary: '#50597B',    // Steel Blue Gray
    accent: '#4A707A',       // Muted Teal
    button: '#606B9A',       // Slate Blue
    text: '#FFFFFF',         // White
    subtext: '#A0A0A5',      // Light Gray
  },
}


export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
})
