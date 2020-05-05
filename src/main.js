import Vue from 'vue';
import App from './App.vue';
import router from './router';

//At this point i found out that i need Vuex for undo-redo logic

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
