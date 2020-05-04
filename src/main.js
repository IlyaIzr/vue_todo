import Vue from 'vue'
import App from './App.vue'
import router from './router'

//At this point i found out that i need Vuex for undo-redo logic
import store from './vuex_store/'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
