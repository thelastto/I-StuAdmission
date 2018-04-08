import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home/index.vue'
import AboutUs from '../views/AboutUs/index.vue'
import Education from '../views/Education/index.vue'
import News from '../views/News/index.vue'


Vue.use(Router)
export const map = [{
  path: '/',
  navhidden:true
}, {
  path:'/home',
  name:'home',
  cn:'HOME',
  component:Home,
}, {
  path:'/aboutus',
  name:'aboutus',
  cn:'ABOUT US',
  component:AboutUs
},{
  path:'/education',
  name:'education',
  cn:'EDUCATION',
  component:Education
},{
  path:'/news',
  name:'news',
  cn:'NEWS',
  component:News
}]
export default new Router({
  // mode: 'history',
  routes: map
})

