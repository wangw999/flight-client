import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MyBookingsPage from './pages/MyBookingsPage'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/Login' element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
    // <div className='bg-amber-300'>
    //   Welcome to FlyMe
    // </div>
  )
}

export default App
