import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../services/http";
import flight5 from '../assets/flight5.png';
import flight6 from '../assets/flight6.png';

const MyBookingsPage = () => {
  // // 模拟预订数据，实际可从接口获取
  // const bookings = {
  //   upcoming: {
  //     reference: "ABC1234",
  //     route: "New York to London",
  //     date: "Departure: July 15, 2024",
  //     image: { flight5 }
  //   },
  //   past: {
  //     reference: "XYZ9876",
  //     route: "London to Paris",
  //     date: "Completed: June 30, 2024",
  //     image: { flight6 }
  //   },
  // };

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    alert(id);
    const showBookingInfo = async () => {
      try {
        const response = await api.get(`/bookings/${id}`);
        setBookings(response.data.data || {});
      } catch (err) {
        // 处理错误
        setError("Failed to fetch flight data: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    showBookingInfo();

  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      {/* 即将出发的预订 */}
      <div className="w-full max-w-xl mb-8 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Booking Reference:{bookings?.flight?.departureAirport?.flightNumber || 'N/A'}</p>
            <p className="font-medium">{bookings?.flight?.departureAirport?.city || 'N/A'} to {bookings?.flight?.departureAirport?.city || 'N/A'}</p>
            <p className="text-sm text-gray-500">{bookings?.flight?.departureDate || 'N/A'}</p>
          </div>
          <div className="w-40 h-24 bg-cover bg-center rounded" style={{ backgroundImage: `url(${flight5})` }}></div>
        </div>
      </div>
      {/* 已完成的预订 */}
      <div className="w-full max-w-xl bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Past</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Booking Reference:{bookings?.flight?.departureAirport?.flightNumber || 'N/A'}</p>
            <p className="font-medium">{bookings?.flight?.departureAirport?.city || 'N/A'} to {bookings?.flight?.departureAirport?.city || 'N/A'}</p>
            <p className="text-sm text-gray-500">{bookings?.flight?.departureDate || 'N/A'}</p>
          </div>
          <div className="w-40 h-24 bg-cover bg-center rounded" style={{ backgroundImage: `url(${flight6})` }}></div>
        </div>
      </div>
       
       {/* 继续按钮 */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-8"
        onClick={() => { navigate('/');  }}>
        return to Home
      </button>
    </div>
  );
};

export default MyBookingsPage;