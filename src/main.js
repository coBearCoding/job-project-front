import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuetable from 'vuetable-2/src/components/Vuetable'

Vue.config.productionTip = false

Vue.component('vuetable', Vuetable);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
