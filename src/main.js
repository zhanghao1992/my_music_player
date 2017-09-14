// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
import VueJsonp from 'vue-jsonp'
import axios from 'axios'
import Vuex from 'vuex'
import Fastclick from 'fastclick'
import App from './App'
import router from './router'

Fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$http = axios
// Vue.prototype.$jsonp = VueJsonp
Vue.use(Vuex)
Vue.use(VueJsonp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
