import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Register/Register'
import Login from './Login/Login'
import ForgetPassword from './ForgetPassword'

const Auth = () => {
  return (
    <Routes>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='forget-password' element={<ForgetPassword/>}/>
    </Routes>
  )
}

export default Auth