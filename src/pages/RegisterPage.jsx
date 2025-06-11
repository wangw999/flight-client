import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/http"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const RegistSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // const response = await api.post("/auth/register", formData);
      const response = await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        phone: formData.phone,
      });

      alert("Successful registration.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed, please check the information:" + err.message);
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h2>
        <form className="space-y-4" onSubmit={RegistSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.email}/>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.password}/>
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.firstName}/>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.lastName}/>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1" >
              Country/Region
            </label>
            <select
              id="country"
              name="country"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.country}>
              <option value="" disabled selected>
                Select your country/region
              </option>
              <option value="China">China</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.phone}/>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;