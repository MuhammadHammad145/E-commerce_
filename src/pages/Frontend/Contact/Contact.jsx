import React, { useState } from 'react'
import { Button, Card, Col, Divider, Form, Input, Row, Typography } from 'antd'
import { FiMail, FiPhone } from 'react-icons/fi'
import Navbar from '../../../components/Header/Navbar'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import Footer from '../../../components/Footer/Footer'



const initailState = { name: "", email: "", phone: "", description: "" }
const Contact = () => {

  const [state, setState] = useState(initailState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => setState((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    let { name, email, phone, description } = state
    const message = { name, email, phone, description, id: window.getRandomId() }
    setIsProcessing(true)
    try {
      await setDoc(doc(db, "message", message.id), message);

      window.toastify("Message sent successfully", "success")
    } catch (e) {
      window.toastify("Something error while sending message", "error")
      console.error("Error adding document: ", e);
    } finally {
      setIsProcessing(false)
    }
  }

  const { Title } = Typography
  return (
    <>
      <Navbar />
      <main className='d-flex justify-content-center align-items-center'>

        <div className="container">
          <Row gutter={[16, 16]} className="mt-5 " >
            <Col xs={24} lg={8}>
              <Card className='shadow p-3 mb-5 bg-body-tertiary rounded w-100 ' style={{
                height:"90%",
                transition: "all 0.3s ease",
                transform: "translateZ(0)",
              }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.01) translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateZ(0)")
                }>
                <div className="d-flex d-row">

                  <div className="contact1 rounded-circle" style={{ width: 48, height: 48 }}>

                    <FiPhone color='white' size={24} />
                  </div>
                  <Title level={4} className='ms-2 mt-2'>Call To Us</Title>
                </div>
                <h6 className='mt-3 fw-normal'>We are available 24/7,7 days a week</h6>
                <h6 className='mt-3 mb-3 fw-normal'>Phone: +923177684383</h6>
                <Divider />
                <div className="d-flex d-row">

                  <div className="contact1 rounded-circle" style={{ width: 48, height: 48 }}>

                    <FiMail size={24} color="white" title="Mail" />
                  </div>
                  <Title level={4} className='ms-2 mt-2'>Write For Us</Title>
                </div>
                <h6 className='mt-3  fw-normal'>Fill out our from and we will contact you within 24 hour.</h6>
                <h6 className='mt-3  fw-normal'>Emails: j.moss.seomaster@gmail.com</h6>
                <h6 className='mt-3  fw-normal'>Emails: d.nelson.linkbuilder@gmail.com</h6>
                {/* <h6 className='mt-3 mb-3 fw-normal'>Phone: +923177684383</h6> */}
              </Card>
            </Col>
            <Col xs={24} lg={16}>
              <Card className='shadow p-3 mb-5 bg-body-tertiary rounded w-100' style={{
                transition: "all 0.3s ease",
                transform: "translateZ(0)",
              }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.01) translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateZ(0)")
                }>

                <Form layout='vertical'>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>

                      <Input type='text' size='large' style={{ background: "#00ffff" }} placeholder='Enter Your Name*' name='name' onChange={handleChange} />

                    </Col>
                    <Col span={8}>

                      <Input type='email' size='large' style={{ background: "#00ffff" }} placeholder='Enter your Email * ' name='email' onChange={handleChange} />

                    </Col>
                    <Col span={8}>

                      <Input type='text' size='large' style={{ background: "#00ffff" }} placeholder='Phone Number *' name='phone' onChange={handleChange} />

                    </Col>
                    <Col span={24}>

                      <Input.TextArea size='large' className='text-dark' style={{ background: "#00ffff", resize: "none", color: "black" }} placeholder='Your Message' name='description' rows={7} onChange={handleChange} />
                    </Col>
                    <Col xs={8} lg={8} className='ms-auto mt-5' >


                      <Button type='primary' danger className='md-m-2 sm-m-2 xs-m-2 ' loading={isProcessing} htmlType='submit' size='large' onClick={handleSubmit} block >Send Message</Button>
                    </Col>

                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Contact