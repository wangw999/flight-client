import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginPage() {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[error, setError] = useState(null)

  const navigate = useNavigate();
  
  return (
     <div>LoginPage works!</div>
  );
}

export default LoginPage
