
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import '@/css/style.css'
import '@/http/index.js'
import axios from 'axios'
Vue.prototype.$axios = axios;

console.log(router);

new Vue({
    el:'#app',
    render:h=>h(App),
    router
})