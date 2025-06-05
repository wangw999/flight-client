import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MyBookingsPage from './pages/MyBookingsPage'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div  className='min-h-screen'>
      {/* <div className='bg-amber-300'>AAAAAAAAAA</div> */}
      <BrowserRouter>
        <header className="bg-amber-100 text-black p-2">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-black font-bold">Flight Service System</h1>
            <nav>
              <Link to="/MyBookingsPage" className="mr-5 hover:underline">Book</Link>
              <Link to="/Login" className="mr-4 hover:underline">Mangment</Link>
              <Link to="/Login" className="hover:underline">Log in</Link>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/MyBookingsPage' element={<MyBookingsPage />} />
            <Route path='/HomePage' element={<HomePage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2025 Flight Service System. All rights reserved.</p>
        </footer>
      </BrowserRouter>
    </div>
  )
}

export default App
