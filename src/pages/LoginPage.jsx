import { useState } from "react"
import { useNavigate, useSearchParams  } from "react-router-dom"
import api from "../services/http"

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止事件的默认行为
    setError(null);
    localStorage.removeItem('jwtToken');
    sessionStorage.removeItem('jwtToken');

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('email', response.data.data.email);
      navigate(redirectPath);
    } catch (err) {
       setError("Login failed, please check your email and password:" + err.message);
    }
  }

  return (
    <div className="flex items-center justify-center bg-white" style={{ height: '650px' }}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Welcome back
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6 text-right">
            <a
              href="#"
              className="text-sm text-gray-500 hover:underline"
            >
              Forgot username or password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-400 transition duration-200"
          >
            Log in
          </button>
        </form>
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
