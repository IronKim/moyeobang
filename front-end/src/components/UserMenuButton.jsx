import React, {useState} from 'react';
import styled, {css} from "styled-components";
import {IoMenu} from "react-icons/io5";
import basicProfileImg from "../assets/images/BasicProfileImg.png";
import {useNavigate} from "react-router-dom";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {userState} from "../atoms/userState";
import Swal from "sweetalert2";
import {useLogout} from "../hooks/useUser";

const Container = styled.div`
    position: static;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const UserMenuButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 40px;
    border-radius: 20px;
    background-color: white;
    transition: all 0.3s; // 원하는 애니메이션 속도로 변경

    ${props =>
            props.$ismenuOpen &&
            css`
                 width: 40px; 
                 height: 40px; 
                 border-radius: 50%; 
        `}
    
    &:hover {
        cursor: pointer;
    }
`

const ProfileImgDiv = styled.div`
    width: ${props => props.width ? props.width : '30px'};
    height: ${props => props.height ? props.height : '30px'};
    border-radius: 50%;
    overflow: hidden;
    margin-left: 10px;
    user-select: none;
    img {
        width: 100%;
        height: 100%;
    }
`

const ButtonDiv = styled.div`
    position: absolute;
    margin-top: 270px;
    margin-right: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 180px;
    height: 220px;
    letter-spacing: 2px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s; // 원하는 애니메이션 속도로 변경
    z-index: 10;

    ${props =>
            props.$ismenuOpen &&
            css`
            // 밑으로 움직이는 애니메이션
                opacity: 1;
                visibility: visible;
                
        `}
    
    p {
        color: black;
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
`

const BorderDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    width: 80%;
    height: 100%;
    border-radius: 10px;
`

const UserDataDiv = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid lightgrey;
`

const UserNameDiv = styled.div`
    position: absolute;
    top: 10px;
    left: 75px;
    width: 100px;
    height: 61px;
    display: flex;
    align-items: center;
    
    font-size: ${props => {
        const length = props.$text.length;
        if (length <= 3) {
            return '25px'; // 3글자 이하일 때
        } else if (length <= 8) {
            return '18px'; // 4글자부터 8글자까지
        } else if (length <= 12) {
            return '15px'; // 9글자부터 12글자까지
        } else {
            return '12px'; // 13글자 이상일 때
        }
    }};
    
    justify-content: ${props => {
        const length = props.$text.length;
        if (length <= 3) {
            return 'center'; // 3글자 이하일 때
        } else {
            return 'flex-start'; // 4글자 이상일 때
        }
    }};
    
    overflow: visible; 
    text-overflow: ellipsis;
    word-break: break-all;
`;

const NameText = styled.span`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Div = styled.div`
    text-align: center;
    letter-spacing: 3px;
    font-size: 20px;
    width: 100%;
    height: 30px;
    border-bottom: ${props => props.$notBorder ? 'none' : '1px solid lightgrey'};
`

const UserMenuButton = () => {
    const [ismenuOpen, setIsmenuOpen] = useState(false);
    const userData = useRecoilValue(userState);
    const logout = useLogout();

    const menuButtonClick = () => {
        setIsmenuOpen(!ismenuOpen);
    }

    return (
        <Container>
            <UserMenuButtonContainer $ismenuOpen={ismenuOpen} onClick={menuButtonClick}>
                <IoMenu size={30} color={'lightgrey'} />
                {
                    !ismenuOpen &&<ProfileImgDiv >
                        <img src={userData.profileImage ? userData.profileImage :basicProfileImg} alt="basicProfileImg" />
                    </ProfileImgDiv>
                }
            </UserMenuButtonContainer>
            {
                <ButtonDiv $ismenuOpen={ismenuOpen}>
                    <BorderDiv>
                        <UserDataDiv>
                            <ProfileImgDiv width={'50px'} height={'50px'} style={{marginLeft: 0, flexBasis: 50}} >
                                <img src={userData.profileImage ? userData.profileImage :basicProfileImg} alt="basicProfileImg" />
                            </ProfileImgDiv>
                            <UserNameDiv $text={userData.profileName ? userData.profileName : '김아무개'}>
                                <NameText>
                                    {userData.profileName ? userData.profileName : '김아무개'}
                                </NameText>
                            </UserNameDiv>
                        </UserDataDiv>
                        <Div>
                            <p>개인정보 수정</p>
                        </Div>
                        <Div>
                            <p>예약내역</p>
                        </Div>
                        <Div onClick={logout} $notBorder={true}>
                            <p>로그아웃</p>
                        </Div>
                    </BorderDiv>
                </ButtonDiv>

            }
        </Container>
    );
};

export default UserMenuButton;