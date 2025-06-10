import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SearchFlightsPage from './pages/SearchFlghtsPage'
import MyBookingsPage from './pages/MyBookingsPage'
import SearchResultsPage from './pages/SearchResultsPage'
import ShowResultDetailPage from './pages/ShowResultDetailPage'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
        <header className="bg-amber-100 text-black p-2 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-black font-bold">Flight Service System</h1>
            <nav>
              <Link to="/myBookings/1" className="mr-5 hover:underline">Book</Link>
              <Link to="/Login" className="mr-4 hover:underline">Management</Link>
              <Link to="/Login" className="hover:underline">Log in</Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow overflow-y-auto h-90vh">
          <Routes>
            <Route path='/' element={<SearchFlightsPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/homePage' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/searchFlights' element={<SearchFlightsPage />} />
            <Route path='/searchResults' element={<SearchResultsPage />} />
            <Route path='/showResultDetail/:id' element={<ShowResultDetailPage />} />
            <Route path='/myBookings/:id' element={<MyBookingsPage />} />
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
