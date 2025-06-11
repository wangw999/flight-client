import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../services/http";

const MyBookingsPage = () => {

  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMybooklist = async () => {
      try {
        const response = await api.get("/bookings");
        setBookings(response.data.data || {});
        if (bookings == undefined) {
          navigate(`/login?redirect=${encodeURIComponent('/myBookings')}`);
        }
      } catch (err) {
        if (err.status == 401 || err.status == 403) {
          navigate(`/login?redirect=${encodeURIComponent('/myBookings')}`);
        } else {
          setError("Failed to fetch flight data: " + err.message);
          console.error(err);
        }
      }
    }
    getMybooklist();
  }, []);

  // 状态样式映射
  const statusStyles = {
    'CONFIRMED': 'bg-green-100 text-green-800',
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'CANCELLED': 'bg-red-100 text-red-800',
    'COMPLETED': 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-gray-50 p-4 md:p-8 mx-auto ">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your flight bookings</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <i className="fa fa-exclamation-circle text-red-500 mt-0.5"></i>
            </div>
            <div className="ml-3">
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Airport</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination Airport</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.flight?.flightNumber || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flight?.departureAirport?.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flight?.departureAirport?.city || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flight?.departureDate || '-'} {' '} {booking.flight?.departureTime || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flight?.destinationAirport?.name || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flight?.destinationAirport?.city || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flight?.destinationDate || '-'} {' '} {booking.flight?.destinationTime || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.flight?.price || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[booking.status] || 'bg-gray-100 text-gray-800'}`}>
                      {booking.status || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flight?.bookingTime || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bookings.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
              <i className="fa fa-plane text-gray-400"></i>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
            <p className="mt-2 text-sm text-gray-500">You currently don't have any flight bookings</p>
            <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <i className="fa fa-search mr-2"></i> Search Flights
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
