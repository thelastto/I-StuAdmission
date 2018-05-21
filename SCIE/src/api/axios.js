
import axios from 'axios'
import router from '../router'
// 添加请求拦截器
axios.defaults.withCredentials = true
let addInterceptor = axios => {
  axios.interceptors.request.use(
    // 在发送请求之前做某事
    config => {
      return config
    },
    function (error) {
      // 请求错误时做些事
      return Promise.reject(error)
    })
}
axios.addInterceptor = addInterceptor
export default axios
