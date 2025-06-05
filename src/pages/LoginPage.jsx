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
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');

    try {
      // const response = await axios.post('http://localhost:8081/api/auth/login', {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      localStorage.setItem('token', response.data.data.token)

      // 登录成功，跳转到服务类型页面
      navigate('/HomePage')
    } catch (err) {
      // 处理错误
      setError('登录失败，请检查邮箱和密码:' + err)
    }
  }

  return (
    <div className="flex items-center justify-center bg-white" style={{ height: '650px' }}>
      {/* 外层容器*/}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* 标题 */}
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Welcome back
        </h2>

        {/* 错误提示保持 */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* 邮箱输入框组 */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Username or email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your username or email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 密码输入框组 */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 忘记密码链接*/}
          <div className="mb-6 text-right">
            <a
              href="#"
              className="text-sm text-gray-500 hover:underline"
            >
              Forgot username or password?
            </a>
          </div>

          {/* 登录按钮*/}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-400 transition duration-200"
          >
            Log in
          </button>
        </form>

        {/* 注册链接 */}
        <div className="mt-4 text-center">
          <span className="text-gray-500">Don't have an account?</span>
          <a href="/register" className="text-blue-500 hover:underline ml-1">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
