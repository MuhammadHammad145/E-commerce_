import React, { useState } from 'react';
import { AppleFilled } from '@ant-design/icons';
import Slider from 'react-slick';
import { Typography } from 'antd';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import iphone14 from "../../assets/iphone14.jpg"

const { Title } = Typography;

const HeroCarousel = () => {
  const [isHover, setIsHover] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-wrapper w-100 overflow-hidden">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="slide">
          <div className="hero d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between p-4  text-white" >
            <div className="container ms-lg-5 text-center text-lg-start">
              <span><AppleFilled style={{ fontSize: 40 }} /></span> <span>iPhone 16 Series</span>
              <p style={{ fontSize: '36px', margin: '10px 0' }}>Up to 10% <br /> off Voucher</p>
              <Title level={5}
                className="text-white pt-0 fw-light pb-2"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <span
                  style={{
                    borderBottom: isHover ? '1px solid white' : '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                    display: 'inline-block'
                  }}
                >
                  Shop Now →
                </span>
              </Title>
            </div>
            <div className="mb-3 mb-lg-0 me-lg-5">
               <img
                src="https://phonetive.pk/cdn/shop/files/Sbb1c2fa4e39b43189171fc78be5b5f29i.jpg_554x554.jpg_5be38468-9421-4043-bdd1-9dfcf581470d_1024x1024.webp?v=1722931732"
                alt="Baseus Headphones"
                className="rounded-1" style={{ width: "350px", height: "300px"}}
              />
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="slide">
          <div className="hero d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between p-4 text-white" >
            <div className="container ms-lg-5 text-center text-lg-start">
              <h2>oraimo Watch ES 2 1.95″</h2>
              <p style={{ fontSize: '36px', margin: '10px 0' }}>AMOLED IP68 Smart Watch</p>
              <Title level={5}
                className="text-white pt-0 fw-light pb-2"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <span
                  style={{
                    borderBottom: isHover ? '1px solid white' : '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                    display: 'inline-block'
                  }}
                >
                  Shop Now →
                </span>
              </Title>
            </div>
            <div className="mb-3 mb-lg-0 me-lg-5">
              <img
                src="https://cdn-img.oraimo.com/fit-in/600x600/KE/product/2024/07/24/OSW-810-680-9.jpg"
                alt="oraimo Watch"
               className="rounded-1" style={{ width: "350px", height: "300px"}}
              />
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="slide">
          <div className="hero d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between p-4 text-white">
            <div className="container ms-lg-5 text-center text-lg-start">
              <h2 style={{ fontSize: '24px' }}>Baseus D05 Bowie Wireless Headphones</h2>
              <p style={{ fontSize: '32px', margin: '10px 0' }}>Bluetooth 5.3 Foldable Sport Headset</p>
              <Title level={5}
                className="text-white pt-0 fw-light pb-2"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <span
                  style={{
                    borderBottom: isHover ? '1px solid white' : '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                    display: 'inline-block'
                  }}
                >
                  Shop Now →
                </span>
              </Title>
            </div>
            <div className="mb-3 mb-lg-0 me-lg-5">
              <img
                src="https://phonetive.pk/cdn/shop/files/Sbb1c2fa4e39b43189171fc78be5b5f29i.jpg_554x554.jpg_5be38468-9421-4043-bdd1-9dfcf581470d_1024x1024.webp?v=1722931732"
                alt="Baseus Headphones"
                className="rounded-1" style={{ width: "350px", height: "300px"}}
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HeroCarousel;



