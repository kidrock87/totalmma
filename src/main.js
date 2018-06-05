// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


import tinymce from 'vue-tinymce-editor'
Vue.component('tinymce', tinymce)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data:{
    server_route: 'http://localhost',
    //server_route: 'http://188.226.197.80',
    server_port: ':3001',
    AppTitle: 'TOTALMMA',
    //news_img_serv: 'http://188.166.26.223:3334/static/'
    news_img_serv: '../files/files/'
  },
  components: { App },
  template: '<App/>'
})
