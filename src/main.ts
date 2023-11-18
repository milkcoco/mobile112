// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

//vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './router'

const vuetify = createVuetify({
  components,
  directives
})

createApp(App).use(vuetify).use(router).mount('#app')
