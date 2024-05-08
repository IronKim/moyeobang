import React from 'react';
import MainContainer from "../../components/MainContainer";
import BoardMenu from "../../components/BoardMenu";
import MainBox from "../../components/MainBox";
import styled from "styled-components";
import {Divider, Image, Rate, Typography} from "antd";
import {Button} from "@material-ui/core"
import {TbGhost2} from "react-icons/tb";
import {GiFootprint} from "react-icons/gi";
import ImageCarousel from "../root/components/ImageCarousel";

const RoomBoardDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    padding-top: 40px;
`

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 20px;
    
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const RoomBoardDetail = () => {
    const [expanded, setExpanded] = React.useState(false);
    return (
        <MainContainer>
            <BoardMenu defaultSelectedKeys={'room'} />
            <MainBox>
                <RoomBoardDetailContainer>
                    <Typography.Title level={2}>방탈출 찾아보기</Typography.Title>
                    <Divider />
                    <DetailContainer>
                        <Divider><Typography.Title level={3}>사랑...하는..감?</Typography.Title></Divider>
                        <div style={{display: "flex", justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', gap: '20px', width: '70%'}}>
                                <div style={{width: '40%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <div  style={{width: '240px', height: '360px'}}>
                                        <Image preview={{
                                            movable: false,
                                            toolbarRender: (preview) => {
                                                return <div style={{display: 'none'}}></div>
                                            },
                                            mask: <div>크게 보기</div>
                                        }} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="example" src="https://zerohongdae.com/storage/NZSXGtMhy5Rod5fwRFqpP9edW6ggmNvFSAytmlDP.jpg" />
                                    </div>
                                    <div style={{width: '90%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px'}}>
                                        <Button variant="contained" style={{backgroundColor: '#D4EBFB'}} >모여방 만들기</Button>
                                        <Button variant="contained" style={{backgroundColor: '#96C2F6', color: 'white'}}>예약하기</Button>
                                    </div>
                                </div>
                                <div style={{width: '70%', height: '100%'}}>
                                    <Typography.Title level={4}>스토리</Typography.Title>
                                    <Typography.Paragraph
                                        ellipsis={{
                                            symbol: expanded ? '접기' : '더보기',
                                            rows: 2,
                                            expandable: 'collapsible',
                                            expanded,
                                            onExpand: (_, info) => setExpanded(info.expanded),
                                        }}
                                    >
                                        {'Ant Design, a design language for background applications, is refined by Ant UED Team.'.repeat(
                                            10,
                                        )}
                                    </Typography.Paragraph>
                                    <Typography.Title level={4}>난이도</Typography.Title>
                                    <Rate style={{fontSize: 16}} allowHalf disabled defaultValue={3.5} />
                                    <Typography.Title style={{marginTop: '20px'}} level={4}>테마</Typography.Title>
                                    <Typography.Paragraph>테마1, 테마2, 테마3</Typography.Paragraph>
                                    <Typography.Title level={4}>적정 인원</Typography.Title>
                                    <Typography.Paragraph>2~4명</Typography.Paragraph>
                                    <Typography.Title level={4}>공포감</Typography.Title>
                                    <Rate
                                        character={({ index }) => {
                                            return index < 3 ? <TbGhost2  /> : <TbGhost2  />;
                                        }}
                                        style={{fontSize: 16, color: 'red'}} allowHalf disabled defaultValue={3.5} />
                                    <Typography.Title level={4}>활동성</Typography.Title>
                                    <Rate
                                        character={({ index }) => {
                                            return index < 3 ? <GiFootprint   /> : <GiFootprint   />;
                                        }}
                                        style={{fontSize: 16, color: 'sienna'}} allowHalf disabled defaultValue={3.5} />
                                </div>
                            </div>
                            <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', margin: '0 auto', gap: '10px'}}>
                                <div style={{height: '100%'}}>
                                    <div style={{width: '300px', height: '300px', backgroundColor: 'blue'}}>
                                    </div>
                                </div>
                                <Typography.Title level={4}>위치</Typography.Title>
                                <Typography.Paragraph>서울특별시 마포구 서교동 395-124</Typography.Paragraph>
                                <div style={{width: '100%', height:'100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', margin: '0 auto'}} >
                                    <Typography.Title style={{paddingTop: '20px', textAlign: 'center'}} level={3}>이용료</Typography.Title>
                                    <Divider />
                                    <div style={{display: 'flex', flexDirection:'column', alignItems:"center"}}>
                                        <Typography.Paragraph style={{fontSize: '16pt'}}>2인 40,000원</Typography.Paragraph>
                                        <Typography.Paragraph style={{fontSize: '16pt'}}>3인 50,000원</Typography.Paragraph>
                                        <Typography.Paragraph style={{fontSize: '16pt'}}>4인 60,000원</Typography.Paragraph>
                                        <Typography.Paragraph style={{fontSize: '16pt'}}>5인 70,000원</Typography.Paragraph>
                                    </div>
                                    <div>
                                        <Typography.Paragraph style={{fontSize: '8pt', textAlign: 'right', paddingRight: '5px'}}>1인은 2인 금액으로 책정됩니다.</Typography.Paragraph>
                                        <Typography.Paragraph style={{fontSize: '8pt', textAlign: 'right', paddingRight: '5px'}}>5인이상은 별도 문의 바랍니다.</Typography.Paragraph>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Typography.Title level={3}>점포내 다른 방탈출</Typography.Title>
                            <Divider />
                            <ImageCarousel />
                        </div>
                    </DetailContainer>
                </RoomBoardDetailContainer>
            </MainBox>
        </MainContainer>
    );
};

export default RoomBoardDetail;