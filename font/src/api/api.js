import axios from './axios'
// import {
//   addInterceptor
// } from './interceptor'
const apiUrl = '/api'
axios.addInterceptor(axios)// 添加拦截
/*
  登录
*/
export const loginByPWD = params => {
  return axios.post(`${apiUrl}/user/login`, params)
}
export const removeFeedback = params => {
  return axios.get(`${apiUrl}/feedback/remove`, {
    params: params
  })
}
export const queryFeedbacks = params => {
  return axios.post(`${apiUrl}/feedback`+params.id,params)
}
export const GetGithubOauth = () => {
  return axios.get(`${apiUrl}/user/oauthPath`)
}
/*
  注册
*/
export const signUpByPWD=params=>{
  return axios.post(`${apiUrl}/user/signUp`,params)
}
// export const GetOauthUserInfo = params => {
//   return axios.get(`${apiUrl}/users/getOauthUser`, {
//     params: params
//   })
// }

/*
  修改aboutSCIE
*/
export const updateAboutSCIE=params=>{
  return axios.post(`${apiUrl}/aboutUs/updateAboutSCIE`,params)
}
/*
  获取aboutSCIE列表
*/
export const getAboutSCIE=params=>{
  return axios.post(`${apiUrl}/aboutUs/getAboutSCIE`,params)
}
/*
  获取aboutSCIE具体内容
*/
export const getAboutSCIEDetail=params=>{
  return axios.post(`${apiUrl}/aboutUs/getAboutSCIEDetail`,params)
}
/*
  删除aboutSCIE
*/
export const removeAboutSCIE=params=>{
  return axios.post(`${apiUrl}/aboutUs/removeAboutSCIE`,params)
}
/*
  应用aboutSCIE
*/
export const applyAboutSCIE=params=>{
  return axios.post(`${apiUrl}/aboutUs/applyAboutSCIE`,params)
}
/*
  修改留学生信息
*/
export const updateStu=params=>{
  return axios.post(`${apiUrl}/student/updateStu`,params)
}
/*
  获取留学生列表
*/
export const getStuList=params=>{
  return axios.post(`${apiUrl}/student/getStuList`,params)
}
/*
  获取留学生具体信息
*/
export const getStuDetail=params=>{
  return axios.post(`${apiUrl}/student/getStuDetail`,params)
}
/*
  删除留学生
*/
export const removeStu=params=>{
  return axios.post(`${apiUrl}/student/removeStu`,params)
}