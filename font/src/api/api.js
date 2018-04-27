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
  修改aboutUS
*/
export const updateAboutUS=params=>{
  return axios.post(`${apiUrl}/aboutUs/updateAboutUS`,params)
}
/*
  获取aboutUS列表
*/
export const getAboutUS=params=>{
  return axios.post(`${apiUrl}/aboutUs/getAboutUS`,params)
}
/*
  获取aboutUS具体内容
*/
export const getAboutUSDetail=params=>{
  return axios.post(`${apiUrl}/aboutUs/getAboutUSDetail`,params)
}
/*
  删除aboutUS
*/
export const removeAboutUS=params=>{
  return axios.post(`${apiUrl}/aboutUs/removeAboutUS`,params)
}
/*
  批量删除aboutUS
*/
export const batchDeleteAboutUS=params=>{
  return axios.post(`${apiUrl}/aboutUs/batchDeleteAboutUS`,params)
}

/*
  应用aboutUS
*/
export const applyAboutUS=params=>{
  return axios.post(`${apiUrl}/aboutUs/applyAboutUS`,params)
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
/*
  导出
*/
export const exportToExel=()=>{
  return axios.get(`${apiUrl}/student/export`)
}
/*
  批量删除留学生
*/
export const batchDeleteStu=params=>{
  return axios.post(`${apiUrl}/student/batchDeleteStu`,params)
}
/*
  获取招生渠道列表
*/
export const getChannelList=params=>{
  return axios.post(`${apiUrl}/channel/getChannelList`,params)
}
/*
  获取招生渠道具体信息
*/
export const getChannelDetail=params=>{
  return axios.post(`${apiUrl}/channel/getChannelDetail`,params)
}
/*
  修改招生渠道信息
*/
export const updateChannel=params=>{
  return axios.post(`${apiUrl}/channel/updateChannel`,params)
}
/*
  删除招生渠道
*/
export const removeChannel=params=>{
  return axios.post(`${apiUrl}/channel/removeChannel`,params)
}
/*
  批量删除招生渠道
*/
export const batchDeleteChannel=params=>{
  return axios.post(`${apiUrl}/channel/batchDeleteChannel`,params)
}
