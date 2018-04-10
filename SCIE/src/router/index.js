import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home/index.vue'
import AboutUs from '../views/AboutUs/index.vue'
import AboutSCIE from '../views/AboutUs/aboutSCIE.vue'
import ContactUs from '../views/AboutUs/ContactUs.vue'
import Education from '../views/Education/index.vue'
import Major from '../views/Education/major.vue'
import Teacher from '../views/Education/teacher.vue'
import News from '../views/News/index.vue'


Vue.use(Router)
export const map = [{
  path:'/',
  name:'home',
  cn:'HOME',
  component:Home,
}, {
  path:'/aboutus',
  name:'aboutus',
  cn:'ABOUT US',
  component:AboutUs,
  children: [{
    path:'/aboutus/aboutSCIE',
    name:'aboutSCIE',
    cn:'ABOUT SCIE',
    component:AboutSCIE
  },{
    path:'/aboutus/contactUs',
    name:'contactUs',
    cn:'CONTACT US',
    component:ContactUs
  }]
},{
  path:'/education',
  name:'education',
  cn:'EDUCATION',
  component:Education,
  children: [{
    path:'/education/major',
    name:'major',
    cn:'MAJOR',
    component:Major
  },{
    path:'/education/teacher',
    name:'teacher',
    cn:'TEACHER',
    component:Teacher
  }]
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

