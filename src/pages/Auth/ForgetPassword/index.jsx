import React, { useState } from 'react';
import { Col, Form, Input, Row, Button, message,Typography } from 'antd';
import { auth } from '../../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Topbar from '../../../components/Header/Topbar';
import Navbar from '../../../components/Header/Navbar';
import cart from "../../../assets/cart.avif"

const {Paragraph,Title}=Typography
const initialState = { email: "" }

const ForgetPassword = () => {
    const [state, setState] = useState(initialState)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {

        const { email } = state


        setIsProcessing(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                window.toastify('Link send in your mail Please check and change it according to your need', 'success')

            })
            .catch((error) => {
                console.error(error)

                setIsProcessing(false)
                message.error("Something wrong will adding")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }


    return (
        <>
            <Topbar />
            <Navbar />
            <main >
                <div className="container">
                    <Row className='w-100 mt-5 d-flex align-items-center justify-content-between'>
                        <Col span={11}>
                            <img src={cart} style={{ maxWidth: "100%", height: "400px", background: "cover" }} />
                        </Col>
                        <Col span={11}>

                            <Title level={1}>Login inti Exclusive </Title>
                            <Paragraph className='mb-4 '>Enter your details below</Paragraph>

                            <Form layout='vertical'>
                                <Row gutter={18}>

                                    <Col span={24}>

                                        <Input type='email' placeholder='Enter Your Email' name='email' size='large' onChange={handleChange} className='border-top-0 border-end-0 border-start-0 mb-4' />


                                    </Col>
                                   
                                    <Col span={10}>
                                        <Button type='primary' danger htmlType='submit' loading={isProcessing} className='rounded-0' size='large' block onClick={handleSubmit} >Login</Button>
                                    </Col>
                                   
                                </Row>

                            </Form>


                        </Col>
                    </Row>

                </div>
            </main>

        </>
    )
}

export default ForgetPassword