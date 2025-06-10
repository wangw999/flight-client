import React from "react";
import flight2 from "../assets/flight2.png";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/http"

function SearchFlightsPage() {

  const [formData, setFormData] = useState({
    tripType: "",
    from: "",
    to: "",
    depart: "",
    return: "",
    passengers: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 提前初始化 navigate

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const serchSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 清空之前的错误信息
    try {
      //画面项目业务check
      // const response = await api.post("/XXXXXcheck", formData);
      navigate("/searchResults", { state: formData }); // 跳转到检索结果页
    } catch (err) {
      // 处理错误
      setError("请检查检索信息:" + err.message);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* 背景图与标题区域 */}
      <div className="relative rounded-md overflow-hidden">
        <img
          src={flight2}
          alt="Plane in sky"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-3xl font-bold mb-2">Book flights</h1>
          <p className="text-sm">Find the best fares for your next trip</p>
        </div>
      </div>

      {/* 表单区域 */}
      <form className="mt-6 space-y-4" onSubmit={serchSubmit}>
        {/* 行程类型 */}
        <div>
          <label htmlFor="tripType" className="block text-sm font-medium text-gray-700 mb-1">
            Trip type
          </label>
          <select
            id="tripType" name="tripType"
            className="w-full md:w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            onChange={formChange}
            value={formData.tripType}
          >
            <option value="oneWay">One-way</option>
            <option value="roundTrip">Round-trip</option>
            <option value="multiCity">Multi-city</option>
          </select>
        </div>

        {/* 出发/到达 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              type="text"
              id="from" name="from"
              placeholder="From"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={formChange}
              value={formData.from}
            />
          </div>
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="text"
              id="to" name="to"
              placeholder="To"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={formChange}
              value={formData.to}
            />
          </div>
        </div>

        {/* 出发/返回日期 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="depart" className="block text-sm font-medium text-gray-700 mb-1">
              Depart
            </label>
            <input
              type="date"
              id="depart" name="depart"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={formChange}
              value={formData.depart}
            />
          </div>
          <div>
            <label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-1">
              Return
            </label>
            <input
              type="date"
              id="return" name="return"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              onChange={formChange}
              value={formData.return}
            />
          </div>
        </div>

        {/* 乘客数量 */}
        <div>
          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
            Passengers
          </label>
          <input
            type="number"
            id="passengers" name="passengers"
            placeholder="Passengers"
            className="w-full md:w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            onChange={formChange}
            value={formData.passengers}
          />
        </div>

        {/* 搜索按钮 */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search flights
        </button>
      </form>
    </div>
  );
}

export default SearchFlightsPage;