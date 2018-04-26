import Vue from 'vue'
import Router from 'vue-router'
import Login from 'views/Login/Login'
import signUp from 'views/Login/signUp'
import Main from 'views/Main/index'
import Student from 'views/Student/index'
import StuInfo from 'views/Student/StuInfo/index'
import StuList from 'views/Student/StuInfo/list'
import StuDetail from 'views/Student/StuInfo/detail'
import StuEdit from 'views/Student/StuInfo/edit'
import StuStatistics from 'views/Student/statistics'
import Pano from 'views/Pano/index'
import StuWebSite from 'views/StuWebSite/index'
// import Home from 'views/StuWebSite/Home/index'
// import ColumnSetting from 'views/StuWebSite/Home/columnSetting' 
// import SliderSetting from 'views/StuWebSite/Home/sliderSetting' 
import AboutUs from 'views/StuWebSite/AboutUs/index'
import AboutSCIE from 'views/StuWebSite/AboutUs/aboutSCIE/index'
import AboutSCIEDetail from 'views/StuWebSite/AboutUs/aboutSCIE/detail'
import AboutSCIEEdit from 'views/StuWebSite/AboutUs/aboutSCIE/edit'
import AboutSCIEList from 'views/StuWebSite/AboutUs/aboutSCIE/list'
import ContactUs from 'views/StuWebSite/AboutUs/contactUs'
import News from 'views/StuWebSite/news'
import Education from 'views/StuWebSite/Education/index'
import Major from 'views/StuWebSite/Education/major'
import Teacher from 'views/StuWebSite/Education/teacher'
import Channel from 'views/Channel/index'
import Agency from 'views/Channel/agency/index'
import AgencyList from 'views/Channel/agency/list'
import AgencyDetail from 'views/Channel/agency/detail'
import AgencyEdit from 'views/Channel/agency/edit'




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
    icon:'el-icon-menu',
    meta:{requireRole:[1,2]},
    component:StuWebSite,
    children:[
    //   {
    //   path:'/main/stuwebsite/home',
    //   name:'home',
    //   cn:'HOME',
    //   meta:{requireRole:[1]},
    //   component:Home,
    //   children:[{
    //     path:'/main/stuwebsite/home/columnSetting',
    //     name:'columnSetting',
    //     cn:'栏目设置',
    //     meta:{requireRole:[1]},
    //     component:ColumnSetting
    //   },{
    //     path:'/main/stuwebsite/home/sliderSetting',
    //     name:'sliderSetting',
    //     cn:'轮播图设置',
    //     meta:{requireRole:[1]},
    //     component:SliderSetting
    //   }]
    // },
    {
      path:'/main/stuwebsite/aboutus',
      name:'aboutus',
      cn:'ABOUT US',
      meta:{requireRole:[1]},
      component:AboutUs,
      children:[{
        path:'/main/stuwebsite/aboutus/aboutSCIE',
        name:'aboutSCIE',
        cn:'ABOUT SCIE',
        meta:{requireRole:[1]},
        component:AboutSCIE,
        redirect:'/main/stuwebsite/aboutus/aboutSCIE/list',
        children:[{
          path:'/main/stuwebsite/aboutus/aboutSCIE/detail',
          name:'aboutSCIEDetail',
          cn:'ABOUT SCIE DETAIL',
          meta:{requireRole:[1]},
          component:AboutSCIEDetail,
        },{
          path:'/main/stuwebsite/aboutus/aboutSCIE/edit',
          name:'aboutSCIEEdit',
          cn:'ABOUT SCIE EDIT',
          meta:{requireRole:[1]},
          component:AboutSCIEEdit,
        },{
          path:'/main/stuwebsite/aboutus/aboutSCIE/list',
          name:'aboutSCIEList',
          cn:'ABOUT SCIE List',
          meta:{requireRole:[1]},
          component:AboutSCIEList,
        }]
      },{
        path:'/main/stuwebsite/aboutus/contactUs',
        name:'contactUs',
        cn:'CONTACT US',
        meta:{requireRole:[1]},
        component:ContactUs
      }]
    },{
      path:'/main/stuwebsite/education',
      name:'education',
      cn:'EDUCATION',
      meta:{requireRole:[1,2]},
      component:Education,
      children:[{
        path:'/main/stuwebsite/education/major',
        name:'major',
        cn:'MAJOR',
        meta:{requireRole:[1]},
        component:Major
      },{
        path:'/main/stuwebsite/education/teacher',
        name:'teacher',
        cn:'TEACHER',
        meta:{requireRole:[1]},
        component:Teacher
      }]
    },{
      path:'/main/stuwebsite/news',
      name:'news',
      cn:'NEWS',
      meta:{requireRole:[1,2]},
      component:News
    }]
  },{
    path: '/main/student',
    name: 'student',
    cn:'留学生信息管理',
    icon:'el-icon-setting',//图标显示
    meta: { requireRole: [1,2] },
    component: Student,
    children:[{
      path: '/main/student/index',
      name: 'stuInfo',
      cn:'留学生信息管理',
      meta: { requireRole: [1,2] },
      component: StuInfo,
      redirect:'/main/student/list',
      children:[{
        path:'/main/student/detail',
        name:'stuDetail',
        meta:{requireRole:[1]},
        component:StuDetail,
      },{
        path:'/main/student/edit',
        name:'stuEdit',
        meta:{requireRole:[1]},
        component:StuEdit,
      },{
        path:'/main/student/list',
        name:'stuList',
        meta:{requireRole:[1]},
        component:StuList,
      }]
    }
    // ,{
    //   path: '/main/student/statistics',
    //   name: 'stuStatistics',
    //   cn:'留学生数据统计',
    //   meta: { requireRole: [1,2] },
    //   component: StuStatistics,
    // }
  ]
  },
  {
    path: '/main/pano',
    name: 'pano',
    cn:'一键通知',
    icon:'el-icon-message',
    component: Pano,
    meta: { requireRole: [1,2] }
  },{
    path: '/main/channel',
    name: 'channel',
    cn:'招生渠道管理',
    icon:'el-icon-share',
    component: Channel,
    children:[{
      path: '/main/channel/agency',
      name: 'agency',
      cn:'中介管理',
      meta: { requireRole: [1,2] },
      component: Agency,
      redirect:'/main/channel/agency/list',
      children:[{
        path:'/main/channel/agency/detail',
        name:'agencyDetail',
        meta:{requireRole:[1]},
        component:AgencyDetail,
      },{
        path:'/main/channel/agency/edit',
        name:'agencyEdit',
        meta:{requireRole:[1]},
        component:AgencyEdit,
      },{
        path:'/main/channel/agency/list',
        name:'agencyList',
        meta:{requireRole:[1]},
        component:AgencyList,
    }],
    meta: { requireRole: [1,2] }
  }]
}]}]
export default new Router({
  // mode: 'history',
  routes: defaultRoutesMap
})
