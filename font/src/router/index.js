import Vue from 'vue'
import Router from 'vue-router'
import Login from 'views/Login/Login'
import signUp from 'views/Login/signUp'
import Main from 'views/Main/index'
import Feedback from 'views/Feedback/index'
import Pano from 'views/Pano/index'
import StuWebSite from 'views/StuWebSite/index'
import Home from 'views/StuWebSite/Home/index'
import AboutUs from 'views/StuWebSite/aboutUs'
import News from 'views/StuWebSite/news'
import Education from 'views/StuWebSite/education'
import Video from 'views/Video/index'


Vue.use(Router)
export  const  defaultRoutesMap=[{
  path: '/',
  navhidden:true
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  navhidden:true
}, {
  path: '/signUp',
  name: 'signUp',
  component: signUp,
  navhidden:true
}]
export const permissionRoutesMap=[{
  path: '/main',
  name: 'main',
  cn:'首页',//中文名称
  component: Main,
  meta: { requireRole: [1,2] },//拥有该路由的角色
  children: [{
    path:'/main/stuwebsite',
    name:'user',
    cn:'留学生网站管理',
    icon:'el-icon-message',
    meta:{requireRole:[1,2]},
    component:StuWebSite,
    children:[{
      path:'/main/stuwebsite/home',
      name:'home',
      cn:'HOME',
      meta:{requireRole:[1]},
      component:Home
    },{
      path:'/main/stuwebsite/aboutus',
      name:'aboutus',
      cn:'ABOUT US',
      meta:{requireRole:[1]},
      component:AboutUs
    },{
      path:'/main/stuwebsite/education',
      name:'education',
      cn:'EDUCATION',
      meta:{requireRole:[1,2]},
      component:Education
    },{
      path:'/main/stuwebsite/news',
      name:'news',
      cn:'NEWS',
      meta:{requireRole:[1,2]},
      component:News
    }]
  },{
    path: '/main/feedback',
    name: 'feedback',
    cn:'留学生信息管理',
    icon:'el-icon-setting',//图标显示
    meta: { requireRole: [1,2] },
    component: Feedback
  },
  {
    path: '/main/pano',
    name: 'pano',
    cn:'一键通知',
    icon:'el-icon-menu',
    component: Pano,
    meta: { requireRole: [1,2] }
  },{
    path: '/main/video',
    name: 'video',
    cn:'招生渠道管理',
    icon:'el-icon-menu',
    component: Video,
    meta: { requireRole: [1,2] }
  }
  ]
}]
export default new Router({
  // mode: 'history',
  routes: defaultRoutesMap
})
