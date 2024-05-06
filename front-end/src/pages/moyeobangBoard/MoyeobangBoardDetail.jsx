import React from 'react';
import MainContainer from "../../components/MainContainer";
import BoardMenu from "../../components/BoardMenu";
import MainBox from "../../components/MainBox";
import {Avatar, Button, Card, Divider, Typography} from "antd";
import styled from "styled-components";
import {useMediaQuery} from "@material-ui/core";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    padding-top: 40px;
`

const Description = styled.div`
    width: 90%;
    height: 100%;
    margin: 0 auto;
    
    @media (max-width: 1200px) {
    }
    
`

const Detail = styled.div`
    display: flex;
    
    @media (max-width: 1200px) {
        flex-direction: column;
    }
`

const MoyeobangBoardDetail = () => {
    const isMobile = useMediaQuery('(max-width: 1200px)');

    return (
        <MainContainer>
            <BoardMenu defaultSelectedKeys={'moyeobang'} />
            <MainBox>
                <Container>
                    <div style={{display: "flex", width: '100%', justifyContent:'space-between'}}>
                        <Typography.Title level={2}>모여방</Typography.Title>
                        <Button>목록</Button>
                    </div>
                    <Divider style={{marginBottom: isMobile && '60px'}} />
                    <Description>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '10%'}}>
                            <Typography.Title style={{fontSize: isMobile ? '1.2em' : '1.5em'}}>
                                같이주말방탈출할사람구해요!같이주말방탈출할사람구해요!12
                            </Typography.Title>
                            <div style={{display:'flex', flexDirection: 'column', gap: '20px', textAlign: 'right'}}>
                                <div style={{display:'flex', fontSize: isMobile ? '12px' : '16px'}}>
                                    방탈출의 제왕방탈출의방탈출의 제왕방탈
                                </div>
                                2024.05.12 14:00
                            </div>
                        </div>
                        <Divider/>
                        <Detail>
                            <div style={{width: isMobile ? '100%' : '70%', padding: isMobile ? '0px' : '30px', letterSpacing: '2px', lineHeight: isMobile ? '25px' : '30px', margin: '0 auto', marginBottom: isMobile ? '25px' : 0 }}>
                                같은 지역구 내에서 주말마다 방탈출 할 분들 구합니다.

                                한 모여방으로 방탈출 공유하고, 게임하러 다니고 있어요.
                                이번에 스머프 방탈출을 갈 건데 인원이 부족해서 모으고 있습니다!
                                빨리 예약하려고 신청 빨리하신 분부터 선착순으로 받을게요.
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column',alignItems: isMobile ? 'center' : 'flex-end', gap: '40px', width: '30%',  margin: '0 auto' }}>
                                <Card style={{width: '250px', borderRadius: '20px', boxShadow: '0 0 10px 0 rgba(0,0,2,0.45)'}}>
                                    <Typography.Title level={4} > 지정된 방탈출</Typography.Title>
                                    <div style={{width: '200px',margin: '0 auto'}}>
                                        <img
                                            src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg"
                                            alt="room" style={{width: '100%', height: '100%'}}/>
                                    </div>
                                    <Button style={{width: '100%', marginTop: '20px'}}>방탈출 보러가기</Button>
                                </Card>

                                <Card style={{width: '250px', borderRadius: '20px', boxShadow: '0 0 10px 0 rgba(0,0,2,0.45)'}}>
                                    <Typography.Title level={4}>모임인원</Typography.Title>
                                    <div style={{display:'flex', height: '20px'}}>
                                        <div style={{width:'80%'}}>
                                            <Avatar style={{
                                                position: 'absolute',
                                                left: 20,
                                                zIndex: 4,
                                                backgroundColor: 'blue'
                                            }}/>
                                            <Avatar style={{
                                                position: 'absolute',
                                                left: 40,
                                                zIndex: 3,
                                                backgroundColor: 'red'
                                            }}/>
                                            <Avatar style={{
                                                position: 'absolute',
                                                left: 60,
                                                zIndex: 2,
                                                backgroundColor: 'green'
                                            }}/>
                                            <Avatar style={{
                                                position: 'absolute',
                                                left: 80,
                                                zIndex: 1,
                                                backgroundColor: 'gold'
                                            }}/>
                                            <Avatar style={{
                                                position: 'absolute',
                                                left: 100,
                                                zIndex: 0,
                                                backgroundColor: 'black'
                                            }}/>
                                        </div>
                                        <div style={{width:'20%'}}>
                                            <Typography.Text style={{fontWeight: 'bold'}} >5/7명</Typography.Text>
                                        </div>
                                    </div>
                                    <Button style={{width: '100%', marginTop: '30px'}}>참여 신청하기</Button>
                                </Card>
                            </div>
                        </Detail>
                    </Description>
                </Container>
            </MainBox>
        </MainContainer>
    );
};

export default MoyeobangBoardDetail;