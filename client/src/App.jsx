import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './component/SignIn'
import SignUp from './component/SignUp'
import Home from './component/Home'
import Navbar from './component/NavBar'
import Profile from './component/Profile';
import DashBoard from './component/DashBoard'


import { ToastContainer } from 'react-toastify'
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<DashBoard />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/profile' element={<Profile />} />
         
      
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}
