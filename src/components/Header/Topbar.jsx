

import React from 'react';
import { Col, Row, Typography } from 'antd';

const { Paragraph } = Typography;

const Topbar = () => {
  return (
    <header className="top m-0 p-0">
      <div className="container">
        <Row justify="center">
          <Col xs={24}>
            <div className="w-100 mx-auto text-center">
              <Paragraph className="text-white py-2 m-0">
                <marquee behavior="scroll" direction="left">
                  Summer Sale For All Swim Suit And Free Express Delivery - OFF 50%! Shop Now
                </marquee>
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default Topbar;