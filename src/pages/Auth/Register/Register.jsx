import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import cart from "../../../assets/cart.avif"
import Topbar from '../../../components/Header/Topbar'
import Navbar from '../../../components/Header/Navbar'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../config/firebase'
import { doc, setDoc } from 'firebase/firestore'


const { Title, Paragraph } = Typography

const initialState = { name: "", email: "", password: "" }
const Register = () => {


    const navigate = useNavigate()

    const [state, setState] = useState(initialState)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {
        let { name, email, password } = state

        name = name.trim()


        if (name.length < 3) {
            window.toastify("Please enter your correct name", "error")
            return
        }
        
        
        const userData={uid:"",name,password,email,id:window.getRandomId()}
        
        setIsProcessing(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            
            createDoc({...userData,uid:user.uid})
            window.toastify("Sign up success fully", "success") 
            
        })
        .catch((error) => {
            console.error('error', error)
            window.toastify("Something error user can not sign up success fully", "error")
            setIsProcessing(false)
            });
        
    }

    const createDoc= async(userData)=>{
         console.log('userData', userData)
            
            try {
                await setDoc(doc(db, "users", userData.uid), userData);
               
                window.toastify("User profile creatimg successfully","success")
              } catch (e) {
                window.toastify("Error creating by user profile","error")
                console.error("Error adding document: ", e);
              } finally{
                setIsProcessing(false)
              }

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

                            <Title level={1}>Create an account </Title>
                            <Paragraph className='mb-4 '>Enter your details below</Paragraph>

                            <Form layout='vertical'>
                                <Row>
                                    <Col span={24}>

                                        <Input type='text' placeholder='Name' name='name' size='large' onChange={handleChange}  className='border-top-0 border-end-0 border-start-0 mb-4' />


                                    </Col>
                                    <Col span={24}>

                                        <Input type='email' placeholder='Enter Your Email' name='email' size='large' onChange={handleChange} className='border-top-0 border-end-0 border-start-0 mb-4' />


                                    </Col>
                                    <Col span={24}>

                                        <Input.Password placeholder='Password' name='password' size='large' onChange={handleChange} className='border-top-0 border-end-0 border-start-0 mb-4' />


                                    </Col>
                                    <Col span={24}>
                                        <Button type='primary' danger htmlType='submit' loading={isProcessing} className='rounded-0' size='large' block onClick={handleSubmit} >Create an account</Button>
                                    </Col>
                                </Row>

                            </Form>
                            <Paragraph className='text-center pt-3'>Already have an account?   <span onClick={() => navigate("/auth/login")} style={{ cursor: "pointer" }} className='ps-2 text-primary'>Login</span></Paragraph>

                        </Col>
                    </Row>

                </div>
            </main>
        </>
    )
}

export default Register