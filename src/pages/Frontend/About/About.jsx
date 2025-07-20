import React from 'react'
import { Card, Col, Image, Row,Typography } from 'antd'
import Navbar from '../../../components/Header/Navbar'
import photo from "../../../assets/hero section.png"
import ceo1 from "../../../assets/ceo1.avif"
import { MdStorefront } from 'react-icons/md'
import { HiOutlineCurrencyDollar, HiOutlineShoppingBag } from 'react-icons/hi'
// import { FaMoneyBag } from 'react-icons/fa6';
import {  GiMoneyStack } from 'react-icons/gi';
import Footer from '../../../components/Footer/Footer'

const { Title, Paragraph } = Typography
const About = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Row className='mt-5 mb-5 d-flex d-column justify-content-center align-items-center'>
          <Col xs={24} lg={10} className='xs-me-2 xs-ms-2 fw-bold'  >
            <h3 className='mb-4' >Our Story</h3>
            <p className='mb-3 '>Launched in 2015,Exclusive is world  Premier makterplace with an action presense
              in Pakistan.Supported by by wide range of tailored
              marketing,data and service solutions,Exculsive have
              10,500 saller and 300 brands and services 3 millions
              customer across the region.</p>
            <p>Exclusive Has more than 1 Million products to offer,
              growing at a very fast.Exclusive offers a diverse assotment
              in ctegories ranging from consumer.
            </p>
          </Col>
          <Col xs={24} md={12} className="mt-2" style={{ textAlign: 'center' }}>
            <Image preview={false} src={photo} style={{ maxWidth: '100%' }} />
          </Col>
        </Row>
        <Row gutter={[16, 16]} className='mb-5'>
          <Col xs={12} lg={6}>
            <Card className='stat-card w-100 d-flex d-column align-items-center justify-content-center'>
              <div className="icon-circle-outer ms-4">

              <div className="icon-circle-inner">

              <MdStorefront className='icon' title="Storefront" style={{ width: 36, height: 36, textAlign: "center" }} />
              </div>
              </div>
              <Title className='text mt-3 ms-3'>10.5k</Title>
              <Paragraph className='para mt-3 text-center'>Saller active our site</Paragraph>
              {/* <Title>10.5k</Title> */}
            </Card>
          </Col>
          <Col xs={12} lg={6}>
            <Card className='stat-card w-100 d-flex d-column  align-items-center justify-content-center'>
              <div className="icon-circle-outer ms-4">

              <div className="icon-circle-inner">

              <HiOutlineCurrencyDollar size="small"  className="icon fw-lighter"  style={{ width: 36, height: 36 }}/>
              </div>
              </div>
               <Title className='text mt-3 ms-3'>33k</Title>
              <Paragraph className='para mt-3 text-center'>Saller active our site</Paragraph>
            </Card>
          </Col>
          <Col xs={12} lg={6}>
            <Card className='stat-card w-100 d-flex d-column justify-content-center'>
              <div className="icon-circle-outer ms-4">

              <div className="icon-circle-inner">

              <HiOutlineShoppingBag className='icon'   style={{ width: 36, height: 36,fontWeight:"lighter" }} />
              </div>
              </div>
               <Title className='text mt-3 ms-3'>25k</Title>
              <Paragraph className='para mt-3 text-center'>Saller active our site</Paragraph>
            </Card>
          </Col>
          <Col xs={12} lg={6}>
            <Card className='stat-card w-100 d-flex d-column justify-content-center'>
              <div className="icon-circle-outer ms-4">

              <div  className="icon-circle-inner">

              <GiMoneyStack className='icon' style={{ width: 36, height: 36, textAlign: "center" }}/>
              </div>
              </div>
               <Title  className='text mt-3 ms-3'>45k</Title>
              <Paragraph className='para mt-3 text-center'>Saller active our site</Paragraph>
            </Card>
          </Col>
        </Row>
         <Row className='mt-5 mb-5 d-flex d-column justify-content-center align-items-center'>
          <Col xs={24} lg={10} className='xs-me-2 xs-ms-2 fw-bold'  >
            <h3 className='mb-4' >Our Mission</h3>
            <p className='mb-3 '>Launched in 2015,Exclusive is world  Premier makterplace with an action presense
              in Pakistan.Supported by by wide range of tailored
              marketing,data and service solutions,Exculsive have
              10,500 saller and 300 brands and services 3 millions
              customer across the region.</p>
            <p>Exclusive Has more than 1 Million products to offer,
              growing at a very fast.Exclusive offers a diverse assotment
              in ctegories ranging from consumer.
            </p>
          </Col>
          <Col xs={24} md={12} className="mt-2" style={{ textAlign: 'center' }}>
            <Image preview={false} src={ceo1} style={{ maxWidth: '100%' }} />
          </Col>
        </Row>
      </div>
      <Footer/>
    </>
  )
}

export default About