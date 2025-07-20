import React from 'react'
import AddProduct from './AddProduct'
import AllProduct from './AllProduct'
import Card from './Card'
import { Route, Routes } from 'react-router-dom'

const Products = () => {
  return (
    <>
    <Routes>
      <Route path='card' element={<Card/>}/>
      <Route path='add-product' element={<AddProduct/>}/>
      <Route path='all-product' element={<AllProduct/>}/>
    </Routes>
    </>
  )
}

export default Products