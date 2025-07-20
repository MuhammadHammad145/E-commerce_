import React, { useState } from 'react'
import { Button, Col, Row, Space, Typography } from 'antd'
import { MdListAlt, MdOutlineProductionQuantityLimits, MdPerson } from 'react-icons/md'
import { FaStore, FaUser } from 'react-icons/fa'
import Topbar from '../../../components/Header/Topbar'
import Navbar from '../../../components/Header/Navbar'
import { AiFillShopping } from 'react-icons/ai'
import Users from '../User/Users'
import AllProduct from './AllProduct'
import Order from '../Orders/Order'


const { Title } = Typography
const Card = () => {

   const [activeTab,setActiveTab]=useState("user")
    const handleUser = () => {
        setIsUser(true)
        setIsOrder(false)
        setIsProduct(false)
    }
    const handleProduct = () => {
        setIsUser(false)
        setIsOrder(false)
        setIsProduct(true)
    }
    const handleOrder = () => {
        setIsUser(false)
        setIsOrder(true)
        setIsProduct(false)
    }
    return (
        <>
            <Topbar />
            <Navbar />
            <main>
                <div className="container">
                    <Row className='d-flex justify-content-between'>
                        <Col span={7}>
                            <div className="card d-flex align-items-center w-100 mt-5 rounded-2 d-flex d-colume mb-5 " style={{ border: "1px solid #a9a9a9", boxShadow: " inset 3px 3px 10px 10px #a9a9a9 ", minHeight: "200px" }}>
                                <div className='mt-4 rounded-circle d-flex align-items-center justify-content-center' style={{ width: 58, height: 58, backgroundColor: "#00ffff" }}>

                                    <MdPerson size={30} color="blue" />


                                </div>
                                <Title level={3} className=" mt-5" style={{ color: "#9932cc" }}>Total Users</Title>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="card w-100 mt-5 rounded-2 d-flex d-colume mb-5 d-flex align-items-center" style={{ border: "1px solid #a9a9a9", boxShadow: " inset 3px 3px 10px 10px #a9a9a9 ", minHeight: "200px" }}>
                                <div className='d-flex align-items-center justify-content-center mt-4 rounded-circle' style={{ width: 58, height: 58, backgroundColor: "#00ffff" }}>

                                    <MdListAlt size={30} color="blue" />;


                                </div>
                                <Title level={3} className=" mt-5" style={{ color: "#9932cc" }}>Total Orders</Title>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="card w-100 mt-5 rounded-2 d-flex d-colume mb-5 d-flex align-items-center" style={{ border: "1px solid #a9a9a9", boxShadow: " inset 3px 3px 10px 10px #a9a9a9 ", minHeight: "200px" }}>
                                <div className='text-center mt-4 rounded-circle pt-2' style={{ width: 58, height: 58, backgroundColor: "#00ffff" }}>

                                    <FaStore size={30} color="blue" />;

                                </div>
                                <Title level={3} className=" mt-5" style={{ color: "#9932cc" }}>Total Products</Title>
                            </div>
                        </Col>
                    </Row>
                    <Row className='d-flex align-items-center justify-content-center'>
                        <Space>

                            <Button className='pt-3 pb-3' style={{ boxShadow: " inset 1px 1px 4px 4px #9932cc ", width: 200, color: "#9932cc",cursor:"pointer" }}><div className="d-flex align-items-center justify-content-center gap-2" onClick={()=>setActiveTab("product")}>
                                <MdOutlineProductionQuantityLimits />Products</div></Button>
                            <Button style={{ boxShadow: " inset 1px 1px 4px 4px  #a9a9a9  ", width: 200, color: "#a9a9a9",cursor:"pointer" }}><div className="d-flex align-items-center justify-content-center gap-2" onClick={()=>setActiveTab("order")}>
                                <AiFillShopping /> Order
                            </div></Button>
                            <Button style={{ boxShadow: " inset 1px 1px 4px 4px #daa520", width: 200, color: "#daa520",cursor:"pointer" }}> <div className="d-flex align-items-center justify-content-center gap-2" onClick={()=>setActiveTab("user")}>
                                <FaUser /> Users
                            </div></Button>
                        </Space>
                    </Row>
                     {activeTab === 'user' && <Users />}
                    {activeTab === 'product' && <AllProduct />}
                    {activeTab === 'order' && <Order />}

                    
                </div>
            </main>
        </>
    )
}

export default Card
