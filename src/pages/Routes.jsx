import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from '../context/Auth'
import { HiH1 } from 'react-icons/hi2'

const Index = () => {
  const {isAuth,user}=useAuthContext()
  return (
    <Routes>
        <Route path='/*' element={<Frontend/>}/>
        <Route path='auth/*' element={isAuth?<Navigate to={"/"}/>:<Auth/>}/>
        <Route path='dashboard/*' element={user?.uid === "h0Iv9YZ6p8NcnecthlkrK7L9Agy1"? <Dashboard/> : <Navigate to={"/"}/> }/>
    </Routes>
  )
}

export default Index