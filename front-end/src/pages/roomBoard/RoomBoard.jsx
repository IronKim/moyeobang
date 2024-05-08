import React from 'react';
import BoardMenu from "../../components/BoardMenu";
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";
import styled from "styled-components";
import {Card, Cascader, Col, Divider, Row, Typography} from "antd";
import Meta from "antd/es/card/Meta";

const RoomBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    padding-top: 40px;
`

const RoomBoard = () => {
    const addressOptions = [
        {
            label: '서울시',
            value: '서울시',
            children:[
                {
                    label: '강남구',
                    value: '강남구',
                },
                {
                    label: '강동구',
                    value: '강동구',
                },
                {
                    label: '강북구',
                    value: '강북구',
                }
            ]
        },
        {
            label: '경기도',
            value: '경기도',
            children:[
                {
                    label: '수원시',
                    value: '수원시',
                },
                {
                    label: '성남시',
                    value: '성남시',
                },
                {
                    label: '용인시',
                    value: '용인시',
                }
            ]
        },
    ];

    return (
        <MainContainer>
            <BoardMenu defaultSelectedKeys={'room'} />
            <MainBox>
                <RoomBoardContainer>
                    <Typography.Title level={2}>방탈출 찾아보기</Typography.Title>
                    <Divider />
                    <div style={{width: '90%', margin: '0 auto',}}>
                        <div style={{width: '100%', display: 'flex', margin: '0 auto', justifyContent: 'space-between'}}>
                            <Cascader
                                style={{
                                    width: '45%',
                                }}
                                options={addressOptions}
                                multiple
                                maxTagCount="responsive"
                                placeholder="지역 선택"
                            />
                            <Cascader
                                style={{
                                    width: '45%',
                                }}
                                options={addressOptions}
                                multiple
                                maxTagCount="responsive"
                                placeholder="테마 선택"
                            />
                        </div>
                        <div style={{textAlign: 'center', marginTop: '35px'}}>
                            <Row
                                gutter={[16, 16]}
                                justify={"start"}>
                                <Col className="gutter-row">
                                    <Card hoverable
                                          style={{ width: 180, height: 330, margin: 'auto'}}
                                          cover={<img style={{width: 180, height: 240}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                                    >
                                        <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                                    </Card>
                                </Col>
                                <Col className="gutter-row" >
                                    <Card hoverable
                                          style={{ width: 180, height: 330, margin: '0 auto'}}
                                          cover={<img style={{width: 180, height: 240}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                                    >
                                        <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                                    </Card>
                                </Col>
                                <Col className="gutter-row" >
                                    <Card hoverable
                                          style={{ width: 180, height: 330, margin: '0 auto'}}
                                          cover={<img style={{width: 180, height: 240}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                                    >
                                        <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                                    </Card>
                                </Col>
                                <Col className="gutter-row" >
                                    <Card hoverable
                                          style={{ width: 180, height: 330, margin: '0 auto'}}
                                          cover={<img style={{width: 180, height: 240}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                                    >
                                        <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                                    </Card>
                                </Col>
                                <Col className="gutter-row" >
                                    <Card hoverable
                                          style={{ width: 180, height: 330, margin: '0 auto'}}
                                          cover={<img style={{width: 180, height: 240}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                                    >
                                        <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                                    </Card>
                                </Col>
                                <Col className="gutter-row" >
                                    <Card hoverable
                                          style={{ width: 180, height: 330, margin: '0 auto'}}
                                          cover={<img style={{width: 180, height: 240}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />}
                                    >
                                        <Meta title="사랑...하는...감" description="제로월드|홍대점" />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </RoomBoardContainer>
            </MainBox>
        </MainContainer>
    );
};

export default RoomBoard;