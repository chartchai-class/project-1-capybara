import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'  // Vuex store
import { createPinia, PiniaVuePlugin } from 'pinia'
import './mock'



Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.productionTip = false

new Vue({
  pinia,
  router,
  store,  // Vuex store
  render: h => h(App)
}).$mount('#app')
