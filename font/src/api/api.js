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