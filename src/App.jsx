import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import React, { useEffect } from "react";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchFlightsPage from './pages/SearchFlghtsPage'
import MyBookingsPage from './pages/MyBookingsPage'
import BookingReviewPage from './pages/BookingReviewPage'
import SearchResultsPage from './pages/SearchResultsPage'
import ShowResultDetailPage from './pages/ShowResultDetailPage'

function App() {

  useEffect(() => {
    const divElement_login = document.getElementById('loginId');
    if (!localStorage.getItem('token')) {
      divElement_login.style.visibility = 'visible';
    } else {
      divElement_login.style.visibility  = 'hidden';
    }
  },[]);

  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
        <header className="bg-amber-100 text-black p-2 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-black font-bold">Flight Service System</h1>
            <nav>
              <Link to="/" className="mr-5 hover:underline">Book</Link>
              <Link to="/myBookings" className="mr-4 hover:underline">Management</Link>
              <Link id='loginId' to="/Login" className="hover:underline">Log in</Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto h-90vh">
          <Routes>
            <Route path='/' element={<SearchFlightsPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/searchFlights' element={<SearchFlightsPage />} />
            <Route path='/searchResults' element={<SearchResultsPage />} />
            <Route path='/showResultDetail/:id' element={<ShowResultDetailPage />} />
            <Route path='/BookingReview/:id' element={<BookingReviewPage />} />
            <Route path='/myBookings' element={<MyBookingsPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center shadow p-4">
          <p>&copy; 2025 Flight Service System. All rights reserved.</p>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
