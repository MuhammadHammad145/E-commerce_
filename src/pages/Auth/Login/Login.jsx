import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import cart from "../../../assets/cart.avif"
import Topbar from '../../../components/Header/Topbar'
import Navbar from '../../../components/Header/Navbar'
import { useNavigate } from 'react-router-dom'
import { auth} from '../../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'



const { Title, Paragraph } = Typography

const initialState = { email: "", password: "" }
const Login = () => {


    const navigate = useNavigate()

    const [state, setState] = useState(initialState)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {
        let {  email, password } = state

       


       
        
       
        
        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log('user', user)

                window.toastify("Login successfully", "success")
            })
            .catch((error) => {
                console.error(error)

                setIsProcessing(false)
                window.toastify("Something wrong will adding","error")
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
                            <img src={cart} style={{ maxWidth: "100%", height: "400px", background: "cover" }} alt='login page' />
                        </Col>
                        <Col span={11}>

                            <Title level={1}>Login inti Exclusive </Title>
                            <Paragraph className='mb-4 '>Enter your details below</Paragraph>

                            <Form layout='vertical'>
                                <Row gutter={18}>
                                    
                                    <Col span={24}>

                                        <Input type='email' placeholder='Enter Your Email' name='email' size='large' onChange={handleChange} className='border-top-0 border-end-0 border-start-0 mb-4' />


                                    </Col>
                                    <Col span={24}>

                                        <Input.Password placeholder='Password' name='password' size='large' onChange={handleChange} className='border-top-0 border-end-0 border-start-0 mb-4' />


                                    </Col>
                                    <Col span={10}>
                                        <Button type='primary' danger htmlType='submit' loading={isProcessing} className='rounded-0' size='large' block onClick={handleSubmit} >Login</Button>
                                    </Col>
                                    <Col span={10}>
                                       <Paragraph className='text-center pt-3'>  <span onClick={() => navigate("/auth/forget-password")} style={{ cursor: "pointer" }} className='ps-2 text-primary'>Forget Password</span></Paragraph>

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

export default Login