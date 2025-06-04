import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MyBookingsPage from './pages/MyBookingsPage'

function App() {
  return (
    <>
    <div className='bg-amber-300'>AAAAAAAAAA</div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/Login' element={<LoginPage/>}/>
      <Route path='/MyBookingsPage' element={<MyBookingsPage/>}/>
      <Route path='/HomePage' element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
