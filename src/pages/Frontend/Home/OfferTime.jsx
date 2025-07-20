import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Card, Col, Image, Row, Typography } from 'antd';
import photo from "../../../assets/hero section.png"
// import photo from "../../assets/hero section.png"



dayjs.extend(duration);

const { Title, Paragraph } = Typography
const OfferTimer = () => {
    const offerEnd = dayjs().add(1, 'day').add(5, 'hour').add(30, 'minute'); // Offer expiry set here
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = dayjs();
            const diff = offerEnd.diff(now);

            if (diff <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                clearInterval(interval);
            } else {
                const dur = dayjs.duration(diff);
                setTimeLeft({
                    days: dur.days(),
                    hours: dur.hours(),
                    minutes: dur.minutes(),
                    seconds: dur.seconds()
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="body" style={{ overflowX: "hidden" }}>
            <div className="container mt-5">
                <Row gutter={[32, 32]} align="middle" justify="center">
                    {/* Text Column */}
                    <Col xs={24} md={12}>
                        <div className="text-center text-md-start">
                            <Title level={2} className='text-white'>Deals of this Month</Title>
                            <Paragraph className='text-white'>
                                Big sale of this month. Buy it and enjoy! It's new stock. Purchase and make fun of it.
                            </Paragraph>

                            {/* Timer Cards Row */}
                            <Row gutter={[16, 16]} justify="center">
                                <Col xs={6}>
                                    <Card className='card' style={{ textAlign: 'center' }}>
                                        <Title level={5} className='text-white'>{timeLeft.days}</Title>
                                        <p className='text-white'>Days</p>
                                    </Card>
                                </Col>
                                <Col xs={6}>
                                    <Card className='card' style={{ textAlign: 'center' }}>
                                        <Title className='text-white' level={5}>{timeLeft.hours}</Title>
                                        <p className='text-white'>Hours</p>
                                    </Card>
                                </Col>
                                <Col xs={6}>
                                    <Card className='card' style={{ textAlign: 'center' }}>
                                        <Title className='text-white' level={5}>{timeLeft.minutes}</Title>
                                        <p className='text-white'>Minutes</p>
                                    </Card>
                                </Col>
                                <Col xs={6}>
                                    <Card className='card' style={{ textAlign: 'center' }}>
                                        <Title className='text-white' level={5}>{timeLeft.seconds}</Title>
                                        <p className='text-white'>Seconds</p>
                                    </Card>
                                </Col>
                            </Row>
                            {/* <Row gutter={[16, 16]} justify="center">
                                <Col xs={6}>
                                    <Card className='card' style={{ textAlign: 'center' }}>
                                        <Title level={5}>{timeLeft.days}</Title>
                                        <p>Days</p>
                                    </Card>
                                </Col>
                                <Col xs={6}>
                                    <Card style={{ textAlign: 'center' }}>
                                        <Title level={5}>{timeLeft.hours}</Title>
                                        <p>Hours</p>
                                    </Card>
                                </Col>
                                <Col xs={6}>
                                    <Card style={{ textAlign: 'center' }}>
                                        <Title level={5}>{timeLeft.minutes}</Title>
                                        <p>Minutes</p>
                                    </Card>
                                </Col>
                                <Col xs={6}>
                                    <Card style={{ textAlign: 'center' }}>
                                        <Title level={5}>{timeLeft.seconds}</Title>
                                        <p>Seconds</p>
                                    </Card>
                                </Col>
                            </Row> */}
                        </div>
                    </Col>

                    {/* Image Column */}
                    <Col xs={24} md={12} className="text-center">
                        <Image preview={false} src={photo} className="img-fluid" />
                    </Col>
                </Row>
            </div>
        </main>

        // <main>

        // <div className='container mt-5 '>
        //     <Row gutter={16} className='d-flex justify-content-between'>
        //         <Col span={12} >
        //             <Title level={2}>Deals of this Month</Title>
        //             <Paragraph>Bigs sale of this month bug it and make fun it.It's new stock not.
        //                 purchase it and enjoy it.
        //             </Paragraph>
        //             <Row gutter={16}>
        //             <Col span={12} className='d-flex d-row'>


        //            <Col span={4} ><Card.Grid style={{width:150,height:100}}className="card d-flex d-colume align-items-center  shadow p-3 mb-5 bg-body-tertiary rounded"  >
        //             <Title level={3}>{timeLeft.days}</Title> <br/>
        //             <Paragraph>Days</Paragraph>
        //              </Card.Grid>
        //            </Col>

        //            <Col span={4} ><Card.Grid style={{width:150,height:100}}className="card d-flex d-colume align-items-center  shadow p-3 mb-5 bg-body-tertiary rounded"  >
        //             <Title level={3}>{timeLeft.hours}</Title> <br/>
        //             <Paragraph>Hours</Paragraph>
        //              </Card.Grid>
        //            </Col>

        //            <Col span={4} ><Card.Grid style={{width:150,height:100}}className="card d-flex d-colume align-items-center  shadow p-3 mb-5 bg-body-tertiary rounded"  >
        //             <Title level={3}>{timeLeft.minutes}</Title> <br/>
        //             <Paragraph>Minutes</Paragraph>
        //              </Card.Grid>
        //            </Col>

        //            <Col span={4} ><Card.Grid style={{width:"",height:100}}className="card d-flex d-colume align-items-center  shadow p-3 mb-5 bg-body-tertiary rounded"  >
        //             <Title level={3}>{timeLeft.seconds}</Title> <br/>
        //             <Paragraph>Seconds</Paragraph>
        //              </Card.Grid>
        //            </Col>


        //             </Col>
        //             </Row>

        //         </Col>
        //         <Col span={12}>
        //                 <Image preview="none"  src={photo} className='w-100'/>
        //         </Col>
        //     </Row>
        // </div>
        // </main>

    );
};

export default OfferTimer;