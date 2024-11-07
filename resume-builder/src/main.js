import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router/router'
import vuetify from "./plugins/vuetify.js";

createApp(App).use(vuetify).use(router).mount("#app");

const gauthOption = {
  clientId: '209811569480-gob89jfqps61m9nsiv0gm53n3n4g89u1.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)
Vue.config.productionTip = false