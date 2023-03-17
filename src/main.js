import { createApp } from "vue";
import { createPinia } from "pinia";
import BootstrapVueNext from "bootstrap-vue-next";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "vue-multiselect/dist/vue-multiselect.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "./assets/main.css";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(BootstrapVueNext);
app.mount("#app");
