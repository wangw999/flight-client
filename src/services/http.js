import axios from 'axios'

// 创建 Axios 实例
const api = axios.create({
  // baseURL: 'http://localhost:8081/api',
  baseURL: import.meta.env.VITE_API_BASE_URL
})

// 请求拦截器，自动添加 Authorization 头
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// url：请求地址
// method：请求方法（GET、POST 等）
// headers：请求头
// params：URL 参数
// data：请求体数据
// timeout：超时时间
// baseURL：基础 URL

export default api
