import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"
import BootstrapVueNext from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import "vue-multiselect/dist/vue-multiselect.css"
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import "./assets/main.css"

const app = createApp(App)
// app.use(Multiselect)
app.use(BootstrapVueNext)
app.use(createPinia())
app.mount('#app')