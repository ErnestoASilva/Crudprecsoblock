// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './logic/store'
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.slim';
import 'popper.js/dist/popper';
import { createPinia } from 'pinia'
const pinia = createPinia()


const app = createApp(App);

app.use(router)
app.use(store)
app.use(pinia)


app.mount('#app');
