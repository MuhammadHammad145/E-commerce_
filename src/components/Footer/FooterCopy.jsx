import React from 'react'
import { Button, Col, Divider, Row } from 'antd'
import { AppleFilled, DownloadOutlined } from '@ant-design/icons';
import bar from "../../assets/fram.png"
import { FaFacebookF, FaGooglePlay, FaInstagram, FaLinkedinIn } from 'react-icons/fa';




const FooterCopy = () => {

    const handleSub = () => {
        window.toastify("Subscribe success Fully", "success")
        return
    }
    return (
        <footer className='m-0 p-0' style={{width:"100%",background:"#1a1414ff"}}>
            <div className="container">
                <Row gutter={[16, 16]} className='mt-5 mb-5'>
                    <Col xs={12} lg={4} className='me-2'>
                        <div className="w-100" style={{ display: "flex", flexDirection: "column" }}>

                            <h4 className='text-white'>Exclusive</h4>
                            <h6 className='text-white ' style={{ cursor: "pointer" }} onClick={handleSub}>Subscribe</h6>
                            <h6 className='text-white fw-lighter' >Get 10% off yoyr first order</h6>
                        </div>


                    </Col>
                    <Col xs={12} lg={5}   >
                        <div className="w-100" style={{ display: "flex", flexDirection: "column" }}>

                            <h6 className='text-white' >Support</h6>
                            <h6 className='fw-lighter mb-3 text-white'>Lal Mill Road,Naeem and Nadeem Ghudam,Faisalabad</h6>
                            <h6 className='fw-lighter mb-3 text-white'>d.nelson.linkbuilder@gmail.com</h6>
                            <h6 className='fw-lighter mb-3 text-white'>+923177684383</h6>
                        </div>


                    </Col>
                    <Col xs={12} lg={4} className='me-2'>
                        <div className="w-100" style={{ display: "flex", flexDirection: "column" }}>

                            <h6 className='text-white'>Account</h6>
                            <h6 className='text-white mb-2 fw-lighter'>My Account</h6>
                            <h6 className='text-white fw-lighter mb-2' >Login / Register</h6>
                            <h6 className='text-white fw-lighter mb-2' >Cart</h6>
                            <h6 className='text-white fw-lighter mb-2' >Shop</h6>
                        </div>


                    </Col>
                    <Col xs={12} lg={4} className='me-2'>
                        <div className="w-100" style={{ display: "flex", flexDirection: "column" }}>

                            <h6 className='text-white'>Quick Link</h6>
                            <h6 className='text-white mb-2 fw-lighter'>Privacy Policy</h6>
                            <h6 className='text-white fw-lighter mb-2' >Terms of Use</h6>
                            <h6 className='text-white fw-lighter mb-2' >FAQ</h6>
                            <h6 className='text-white fw-lighter mb-2' >Contact</h6>
                        </div>


                    </Col>
                    <Col xs={12} lg={6} className='me-2'>
                        <div className="w-100" style={{ display: "flex", flexDirection: "column" ,cursor:"pointer"}}>
                            <h6 className='text-white mb-3' >Download</h6>
                            <p className='text-white fw-lighter mb-3' >Save $3 wuth app new user</p>
                            <div className="d-flex d-row">

                                <img src={bar} className='' style={{ width: 80, height: 86 }} />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {/* <div className='rounded ms-2' style={{ border: "0.3px solid white", width: 150, height: 40 }}><span className='text-white'><AppleFilled style={{ fontSize: 38 }} /></span></div> */}
                                    <Button className='ms-2' icon={<FaGooglePlay style={{ color: "#34A853" }} />} style={{ background: "transparent", width: 150 }} size="large">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <p className='fw-lighter mt-0 mb-0 text-white' style={{ fontSize: "10px" }}>Get IT On </p>
                                            <h6 className='text-white'>Google Paly</h6>
                                        </div>
                                    </Button>
                                    <Button className='ms-2 mt-2' icon={<AppleFilled className='text-white' style={{ fontSize: "30" }} />} style={{ background: "transparent", width: 150 }} size="large">
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <p className='fw-lighter mt-0 mb-0 text-white' style={{ fontSize: "10px" }}>Download on the  </p>
                                            <h6 className='text-white'>App Store</h6>
                                        </div>
                                    </Button>
                                    {/* <div className='rounded ms-2 mt-2' style={{border:"0.3px solid white",width:150,height:40}}><span color='white'><FaGooglePlay size={32} title="Google Play Store" /></span></div> */}

                                </div>

                            </div>
                            <div className="mt-3" style={{ display: 'flex', gap: '20px',color:"white" }}>
                                <FaFacebookF size={20}  />
                                <FaInstagram size={20}  />
                                <FaLinkedinIn size={20}  />
                            </div>

                        </div>


                    </Col>
                    

                </Row>
            </div>
        </footer >
    )
}

export default FooterCopy