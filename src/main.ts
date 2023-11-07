// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


//vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

<<<<<<< HEAD
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import router from './route'
=======
import router from './router'

>>>>>>> a1908841b5595e1acdfeffbbf1dd238d42d6518e
const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(vuetify).use(router).mount('#app')
