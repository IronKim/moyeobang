import React from 'react';
import Slider from "react-slick";
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import "../../../css/slick.css";
import "../../../css/slick-theme.css";
import styled from "styled-components";

const Carousel = styled.div`
    @media (max-width: 1200px) {
        display: none;
    }
`

const ImageCarousel = () => {
    const settings = {
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
    };

    return (
        <Carousel style={{width: '90%', margin: '0 auto'}}>
            <Slider {...settings}>
                <Card hoverable
                      style={{ width: 240, height: 400}}
                      cover={<img style={{width: 240, height: 320}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                >
                    <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                </Card>
                <Card hoverable
                      style={{ width: 240, height: 400}}
                      cover={<img style={{width: 240, height: 320}} alt="example" src="https://zerohongdae.com/storage/9ibzZ5mUK63r5DvwjODh9e64heWXtFG8rxFili3P.jpg" />}
                >
                    <Meta title="ALIVE" description="제로월드|홍대점" />
                </Card>
                <Card hoverable
                      style={{ width: 240, height: 400}}
                      cover={<img style={{width: 240, height: 320}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                >
                    <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                </Card>
                <Card hoverable
                      style={{ width: 240, height: 400}}
                      cover={<img style={{width: 240, height: 320}} alt="example" src="https://zerohongdae.com/storage/9ibzZ5mUK63r5DvwjODh9e64heWXtFG8rxFili3P.jpg" />}
                >
                    <Meta title="ALIVE" description="제로월드|홍대점" />
                </Card>
                <Card hoverable
                      style={{ width: 240, height: 400}}
                      cover={<img style={{width: 240, height: 320}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                >
                    <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                </Card>
            </Slider>
        </Carousel>
    );
};

export default ImageCarousel;