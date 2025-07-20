import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Products from './Products/Products'
import Users from './User/Users'
import Order from './Orders/Order'

const Index = () => {
  return (
    <Routes>
        <Route index element={<Navigate to={"/dashboard/product/all-product"}/>}/>      
        <Route path='product/*' element={<Products/>}/>
        <Route path='user' element={<Users/>}/>
        <Route path='order' element={<Order/>}/>
    </Routes>
  )
}

export default Index