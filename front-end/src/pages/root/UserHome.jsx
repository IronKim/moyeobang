import React from 'react';
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";
import ImageCarousel from "./components/ImageCarousel";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 30px;
    font-weight: bold;
    padding-top: 30px;
    margin-bottom: 20px;
    text-align: center;
    
    @media (max-width: 1200px) {
        display: none;
    }
`

const BoardContainer = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    
    @media (max-width: 1200px) {
        flex-direction: column;
        width: 100%;
    }
`

const MoyeobangBoradContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    height: 300px;
    
    @media (max-width: 1200px) {
        width: 100%;
    }
`

const RoomBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    height: 300px;

    @media (max-width: 1200px) {
        width: 100%;
    }
`

const SemiTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
`

const ContentDiv = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    width: 90%;
    height: 50px;
    justify-content: space-between;
    border-radius: 10px;
    background-color: #F9F9F9;
    
    &:hover {
        cursor: pointer;
        background-color: #F0F0F0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        
    }
    
    h3 {
        margin-left: 20px;
        font-size: 20px;
        font-weight: normal;
        
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    h5 {
        margin-right: 20px;
        font-size: 15px;
        font-weight: normal;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

const UserHome = () => {
    return (
        <MainContainer>
            <MainBox>
                <Title>OOO님의 취향 맞춤 추천 테마 어떠세요?</Title>
                <ImageCarousel />
                <BoardContainer>
                    <MoyeobangBoradContainer>
                        <SemiTitle>실시간 모임방</SemiTitle>
                        <ContentDiv>
                            <h3>스머프 어쩌구 어쩌구 모임방</h3>
                            <h5>강남구</h5>
                        </ContentDiv>
                        <ContentDiv>
                            <h3>스머프 어쩌구 어쩌구 모임방</h3>
                            <h5>강남구</h5>
                        </ContentDiv>
                        <ContentDiv>
                            <h3>스머프 어쩌구 어쩌구 모임방</h3>
                            <h5>강남구</h5>
                        </ContentDiv>
                        <ContentDiv>
                            <h3>스머프 어쩌구 어쩌구 모임방</h3>
                            <h5>강남구</h5>
                        </ContentDiv>
                    </MoyeobangBoradContainer>
                    <RoomBoardContainer>
                        <SemiTitle>새로 나왔어요!</SemiTitle>
                        <ContentDiv>
                            <h3>ALIVE</h3>
                            <h5>강남구</h5>
                        </ContentDiv>
                        <ContentDiv>
                            <h3>사랑...하는...감?</h3>
                            <h5>강남구</h5>
                        </ContentDiv>
                        <ContentDiv>
                            <h3>스머프 어쩌구 어쩌구 모임방</h3>
                            <h5>강남구</h5>
                        </ContentDiv>
                        <ContentDiv>
                            <h3>스머프 어쩌구 어쩌구 모임방</h3>
                            <h5>강남구</h5>
                        </ContentDiv>
                    </RoomBoardContainer>
                </BoardContainer>
            </MainBox>
        </MainContainer>
    );
};

export default UserHome;