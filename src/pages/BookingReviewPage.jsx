import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../services/http";
import flight5 from '../assets/flight5.png';
import flight6 from '../assets/flight6.png';
import emptyUpcoming from '../assets/emptyUpcoming.png';
import emptyPast from '../assets/emptyPast.png';

const BookingReviewPage = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();

  useEffect(() => { }, []);

  useEffect(() => {
    const showBookingInfo = async () => {
      const divElement_hasData = document.getElementById('hasData');
      const divElement_noData = document.getElementById('noData');
      try {
        const response = await api.get(`/bookings/${id}`);
        setBookings(response.data.data || {});
        divElement_hasData.style.display = 'block';
        divElement_noData.style.display = 'none';
      } catch (err) {
        if (err.status == "500") {
          divElement_hasData.style.display = 'none';
          divElement_noData.style.display = 'block';
        } else {
          setError("Failed to fetch flight data: " + err.message);
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    showBookingInfo();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      <div id="hasData" className="w-full max-w-xl mb-8 bg-white p-4 rounded shadow">
        <div className="w-full max-w-xl bg-white p-4 rounded shadow">
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-8"
          onClick={() => { navigate('/'); }}>
          return to Home
        </button>
      </div>
      <div id="noData" className="w-full max-w-xl mb-8 bg-white p-4 rounded shadow">
        <div className="flex flex-col items-center justify-center p-6">
          <img
            src={emptyUpcoming}
            alt="No Upcoming Bookings"
            className="w-50 h-36 mb-4 rounded"
          />
          <h4 className="text-base font-medium mb-1">No upcoming bookings</h4>
          <p className="text-sm text-gray-500 text-center">
            You don’t have any upcoming bookings. Start planning your next
            trip now.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-6">
          <img
            src={emptyPast}
            alt="No Past Bookings"
            className="w-50 h-36 mb-4 rounded"
          />
          <h4 className="text-base font-medium mb-1">No past bookings</h4>
          <p className="text-sm text-gray-500 text-center">
            You don’t have any past bookings. Your booking history will
            appear here once you’ve completed a flight.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingReviewPage;