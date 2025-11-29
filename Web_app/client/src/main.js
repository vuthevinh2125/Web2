import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import 'semantic-ui-css/semantic.css'

const app = createApp(App)

app.use(router)

app.mount('#app')