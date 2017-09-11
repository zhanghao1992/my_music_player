// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
import VueJsonp from 'vue-jsonp'
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'
import axios from 'axios'
import Vuex from 'vuex'
import Fastclick from 'fastclick'
import App from './App'
import router from './router'

Fastclick.attach(document.body)
Vue.config.productionTip = false
// Vue.use(Mint)
Vue.use(Element)
Vue.prototype.$http = axios
Vue.use(Vuex)
Vue.use(VueJsonp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
