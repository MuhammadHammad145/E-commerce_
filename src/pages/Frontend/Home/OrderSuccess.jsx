import React from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../../components/Header/Navbar'
import Footer from '../../../components/Footer/Footer'



const { Title, Paragraph } = Typography

const OrderSuccess = () => {

    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            
            <main className='d-flex d-column align-items-center justify-content-center' style={{minHeight:"100vh"}}>
                <Row>
                    <Col>
                        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "300px" }}>


                            <div className="rounded-circle" style={{
                                display: "flex", alignItems: "center", justifyContent: "center",
                                backgroundColor: "#daa520", justifySelf: "center", width: 65, height: 65
                            }} >

                                <FaCheck className='icon' title="Storefront" style={{ width: 36, height: 36, color: "white" }} />
                            </div>

                            <Title className='text mt-3 ms-3 text-center' style={{ color: "green" }}>Order Place!</Title>
                            <Paragraph className='mt-3 text-center'>Your order have been place successfully.Thanks For purchase your order will sent you in a few days,
                                I hope you will like my services.
                            </Paragraph>
                            <Row>
                                <Col span={24}>
                                    <Button type='primary' block onClick={() => navigate("/")}>Go To Home</Button>
                                </Col>
                            </Row>
                            {/* <Title>10.5k</Title> */}
                        </Card>
                    </Col>
                </Row>
            </main>
            <Footer />
        </>
    )
}

export default OrderSuccess