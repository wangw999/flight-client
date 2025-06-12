import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../services/http";
import flight3 from '../assets/flight3.png';
import flight4 from '../assets/flight4.png';

const ShowResultDetailPage = () => {
  const { id } = useParams();
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/flights/${id}`);
        setFlightData(response.data.data || {});
      } catch (err) {
        setError("Failed to fetch flight data: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlightData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }
  if (!flightData || Object.keys(flightData).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-500">No flight data found.</p>
      </div>
    );
  }

  const paymentDetail = async (e) => {
    try {
      const requestData = {
        flightNumber: flightData.flightNumber,
        passengerInfo: {
          "email": localStorage.getItem('email'),
        }
      };
      const response = await api.post("/bookings/create", requestData);
      let bookingId = response.data.data.bookingId;
      if (response.status == 201) {
        navigate(`/BookingReview/${bookingId}`);
      }
    }
    catch (err) {
      if (err.status == 401 || err.status == 403) {
        // const currentPath = window.location.pathname;
        navigate(`/login?redirect=${encodeURIComponent(`/myBookings/${id}`)}`);
      } else {
        setError("Failed to fetch flight data: " + err.message);
        console.error(err);
      }
    }
  }

  return (
    <div className="p-6 bg-white max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Review your flights</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Outbound</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">{flightData.departureAirport?.name || '-'}</p>
            <p className="font-medium">{flightData.departureAirport?.city || '-'}</p>
            <p className="text-sm text-gray-500">
              {flightData?.departureDate || '-'} {' '}  {flightData?.departureTime || '-'}
            </p>
          </div>
          <div className="w-40 h-24 bg-cover bg-center rounded" style={{
            backgroundImage: `url(${flight3})`
          }}></div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Return</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">{flightData.destinationAirport?.name || '-'}</p>
            <p className="font-medium">{flightData.destinationAirport?.city || '-'}</p>
            <p className="text-sm text-gray-500">
              {flightData?.destinationDate || '-'} {' '}  {flightData?.destinationTime || '-'}
            </p>
          </div>
          <div className="w-40 h-24 bg-cover bg-center rounded" style={{
            backgroundImage: `url(${flight4})`
          }}></div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Fare summary</h3>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Base fare</span>
          <span>{flightData?.price || '-'}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">{flightData.fare?.taxes || '-'}</span>
          <span></span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{flightData?.price || '-'}</span>
        </div>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={() => { paymentDetail() }}>
        Continue to payment
      </button>
    </div>
  );
};

export default ShowResultDetailPage;