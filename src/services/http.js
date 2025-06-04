import axios from 'axios'

// 创建 Axios 实例
const api = axios.create({
  baseURL: 'http://localhost:8081/api',
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

export default api
