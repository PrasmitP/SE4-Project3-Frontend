/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import Vue from 'vue'
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import { createPinia } from 'pinia'

const app = createApp(App).use(createPinia())

registerPlugins(app)

app.mount('#app')


import GoogleAuth from '@/config/google_oAuth.js'
const gauthOption = {
  clientId: '209811569480-gob89jfqps61m9nsiv0gm53n3n4g89u1.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')