// The Vue build version to load with the `import` command

// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import Vuex from "vuex"

import ElementUI from 'element-ui'

import App from './App'

import router from './router' //这里引入的是router目录，会默认识别里面的index.js文件（不能是其他名字）

Vue.use(ElementUI)

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */

//实例化vue对象配置选项路由及渲染App组件

new Vue({

  el: '#app',  //这里绑定的是index.html中的id为app的div元素

  router,

  render: h => h(App)

//这里的render: h => h(App)是es6的写法 

//转换过来就是：  暂且可理解为是渲染App组件

//  render:(function(h){

//    return h(App);

//  });

});