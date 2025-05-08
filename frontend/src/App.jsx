import './App.css'
import Navbar from './componenets/Navbar'
import Footer from './componenets/Footer'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Create from './pages/Create'

import { authActions } from './store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from "axios"
import { Toaster } from "react-hot-toast"

function App() {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    const fetchCookies = async() => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/check`, {
          withCredentials: true
        })

        if(res.data.isAuthenticated){
          dispatch(authActions.login())
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    }

    fetchCookies()
  }, [])

  return (
    <div className='bg-base-200'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        {
          isLoggedIn && (
            <>
              <Route path='/create' element={<Create />} />
              <Route path='/update/:id' element={<Create />} />
            </>
          )
        }
      </Routes>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
