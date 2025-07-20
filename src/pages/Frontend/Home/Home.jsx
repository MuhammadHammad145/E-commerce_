import React from 'react';
import Header from '../../../components/Header';
import GetProducts from './GetProducts';
import OfferTimer from './OfferTime';
import Footer from '../../../components/Footer/Footer';

const Home = () => {
  return (
    <>
   <Header/>
   <OfferTimer/>
   <GetProducts/>
   <Footer/>
    </>
  )
}

export default Home