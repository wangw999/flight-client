import React from "react";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/http"

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state || {};
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState(null);
  // const [selectedId, setSelectedId] = useState([]);


  useEffect(() => {

    const showResults = async (e) => {
      // alert(searchData.from + "--" + searchData.to + "--" + searchData.depart);
      try {
        // 构建符合URL格式的参数
        const params = {
          from: searchData.from,
          to: searchData.to,
          // 确保日期格式为 yyyyMMdd
          date: searchData.depart.replace(/-/g, '')
        };

        // 调用API，使用完整路径
        const response = await api.get("/flights", { params });

        // // 构建请求体数据
        // const requestData = {
        //   from: searchData.from,
        //   to: searchData.to,
        //   date: searchData.date.replace(/-/g, '') // 格式化为 yyyyMMdd
        // };

        // // 使用 POST 请求
        // const response = await api.post("/api/flights/search", requestData);

        // 更新状态
        setFlightData(response.data.data || []);


        // // 使用 Axios 发起 GET 请求
        // axios.get('https://api.example.com/users')
        //   .then(response => setUsers(response.data))
        //   .catch(error => console.error('Error:', error));

      } catch (err) {
        // 处理错误
        setError("Failed to fetch flights:" + err.message);
        alert(error); // 显示错误提示
      }
    }

    if (searchData.tripType || searchData.from || searchData.to || searchData.depart || searchData.return) {
      showResults();
    }
  }, []);

  const showResultsDetail = (selectedId) => {
    navigate(`/showResultDetail/${selectedId}`);
  }


  return (
    <div className="container mx-auto p-4">
      <div className="text-sm text-gray-500 mb-4">
        Flights : <span className="text-red-600">{searchData.from}</span> to <span className="text-red-600">{searchData.to}</span>
      </div>
      <h2 className="text-xl font-bold mb-4">Select your outbound flight </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">Airline</th>
              <th className="px-4 py-2 font-medium text-gray-700">Departure</th>
              <th className="px-4 py-2 font-medium text-gray-700">Arrival</th>
              <th className="px-4 py-2 font-medium text-gray-700">Duration</th>
              <th className="px-4 py-2 font-medium text-gray-700">Stops</th>
              <th className="px-4 py-2 font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 font-medium text-gray-700">Price</th>
              <th className="px-4 py-2 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {flightData.map((flight) => (
              <tr
                key={flight.flightNumber}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{flight.flightNumber}</td>
                <td className="px-4 py-3">{flight.departureAirport.name}</td>
                <td className="px-4 py-3">{flight.departureAirport.city}</td>
                <td className="px-4 py-3">{flight.destinationAirport.name}</td>
                <td className="px-4 py-3">{flight.destinationAirport.city}</td>
                <td className="px-4 py-3">{flight.departureDate} {flight.departureTime}</td>
                <td className="px-4 py-3">{flight.price}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline" onClick={() => showResultsDetail(flight.flightNumber)}>
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchResultsPage;