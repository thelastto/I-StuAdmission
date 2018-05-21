import axios from './axios'
// import {
//   addInterceptor
// } from './interceptor'
const apiUrl = '/api'
axios.addInterceptor(axios)// 添加拦截


/*
  获取aboutUS页面的内容
*/
export const getAboutUsPage=params=>{
  return axios.post(`${apiUrl}/aboutUs/getAboutUsPage`,params)
}


/*
  获取专业列表
*/
export const getMajorList=params=>{
  return axios.post(`${apiUrl}/major/getMajorList`,params)
}

/*
  获取教师列表
*/
export const getTeacherList=params=>{
  return axios.post(`${apiUrl}/teacher/getTeacherList`,params)
}
/*
  获取教师信息具体信息
*/
export const getTeacherDetail=params=>{
  return axios.post(`${apiUrl}/teacher/getTeacherDetail`,params)
}
/*
  获取新闻列表
*/
export const getNewsList=params=>{
  return axios.post(`${apiUrl}/news/getNewsList`,params)
}
/*
  获取新闻具体内容
*/
export const getNewsDetail=params=>{
  return axios.post(`${apiUrl}/news/getNewsDetail`,params)
}