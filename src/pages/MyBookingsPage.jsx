import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import api from "../services/http";
import flight5 from '../assets/flight5.png';
import flight6 from '../assets/flight6.png';
import emptyUpcoming from '../assets/emptyUpcoming.png';
import emptyPast from '../assets/emptyPast.png';

const MyBookingsPage = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => { }, []);


  return (
    <>
    </> 
  );
};

export default MyBookingsPage;