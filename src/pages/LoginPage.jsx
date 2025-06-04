import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/http"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null) // 清除之前的错误

    try {
      // const response = await axios.post('http://localhost:8081/api/auth/login', {
        const response = await api.post('/auth/login', {
        email,
        password,
      })

      debugger
      localStorage.setItem('token', response.data.data.token)

      // 登录成功，跳转到服务类型页面
      navigate('/HomePage')
    } catch (err) {
      // 处理错误
      setError('登录失败，请检查邮箱和密码:' + err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">登录</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              placeholder="请输入邮箱"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              密码
            </label>
            <input
              type="password"
              id="password"
              placeholder="请输入密码"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            登录
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">没有账号？</span>
          <a href="/register" className="text-blue-500 hover:underline ml-1">
            立即注册
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
