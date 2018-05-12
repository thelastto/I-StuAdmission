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
/*
  添加专业
*/
export const addMajor=params=>{
  return axios.post(`${apiUrl}/major/addMajor`,params)
}
/*
  获取专业列表
*/
export const getMajorList=params=>{
  return axios.post(`${apiUrl}/major/getMajorList`,params)
}
/*
  删除专业
*/
export const removeMajor=params=>{
  return axios.post(`${apiUrl}/major/removeMajor`,params)
}
/*
  删除专业
*/
export const updateMajor=params=>{
  return axios.post(`${apiUrl}/major/updateMajor`,params)
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
  修改教师信息信息
*/
export const updateTeacher=params=>{
  return axios.post(`${apiUrl}/teacher/updateTeacher`,params)
}
/*
  删除教师信息
*/
export const removeTeacher=params=>{
  return axios.post(`${apiUrl}/teacher/removeTeacher`,params)
}
/*
  批量删除教师信息
*/
export const batchDeleteTeacher=params=>{
  return axios.post(`${apiUrl}/teacher/batchDeleteTeacher`,params)
}