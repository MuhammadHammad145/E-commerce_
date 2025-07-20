import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Contact from './Contact/Contact'
import About from './About/About'
import Cart from './Home/Cart'
import Billing from './Home/Billing'
import Product from './Product/Product'
import PrivateRoute from '../../components/PrivateRoute'
import OrderSuccess from './Home/OrderSuccess'

const Frontend = () => {

  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='cart' element={<PrivateRoute Component={Cart}/>}/>
        <Route path='billing' element={<PrivateRoute Component={Billing}/>} />
        <Route path='thanks-for-shop' element={<OrderSuccess/>}/>
        <Route path='product/:id' element={<Product/>}/>
        <Route path='contact' element={<Contact/>}/>
        <Route path='about' element={<About/>}/>
        
    </Routes>
  )
}

export default Frontend