import React from 'react';
import styled from "styled-components";
import logoWhite from '../../../assets/images/Logo(White).png';
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../../../atoms/userState";
import {ROLETYPE} from "../../../constants/ROLETYPE";
import Swal from "sweetalert2";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #202166;
    width: 100%;
    height: 18.7593vh;
    
    @media (max-width: 1200px) {
        display: flex;
        flex-direction: row;
        height: 6.5555vh;
    }
`

const HeaderRow = styled.div`
    margin-top: 30px;
    padding: 0 100px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1200px) {
        width: 100%;
        margin-top: 0;
        padding: 0 12px;
        height: 100%;
    }
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    height: 52px;
    
    @media (max-width: 1200px) {
        margin: 0 auto;
        height: 100%;
    }
`

const Logo = styled.img`
    height: 80%;

    &:hover {
        cursor: pointer;
    }

    @media (max-width: 1200px) {
        margin-top: 4px;
        height: 80%;
    }
`

const SwitchHomeButton = styled.button`
    border: 1px solid #a7b8ff;
    background: transparent;
    color: #ffffff;
    height: 36px;
    padding: 0 14px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;

    &:hover {
        cursor: pointer;
        background: rgba(255, 255, 255, 0.12);
    }

    @media (max-width: 1200px) {
        height: 30px;
        font-size: 12px;
        padding: 0 10px;
    }
`;

const SellerSimpleHeader = () => {
    const navigate = useNavigate();
    const setUserData = useSetRecoilState(userState);

    const handleSwitchToUserHome = () => {
        Swal.fire({
            icon: 'question',
            title: '유저 홈으로 이동',
            text: '사업자 화면에서 나가서 유저 홈으로 이동하시겠어요?',
            showCancelButton: true,
            confirmButtonText: '이동',
            cancelButtonText: '취소',
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }

            setUserData((prev) => ({
                ...prev,
                roleType: ROLETYPE.USER,
            }));
            navigate('/');
        });
    };

    return (
        <HeaderContainer>
            <HeaderRow>
                <LogoContainer>
                    <Logo src={logoWhite} alt='logo' onClick={() => navigate('/')} />
                    <span style={{color: 'white', marginLeft: '10px', textDecoration: 'underline'}}>사업자</span>
                </LogoContainer>
                <SwitchHomeButton type={'button'} onClick={handleSwitchToUserHome}>
                    유저 홈으로
                </SwitchHomeButton>
            </HeaderRow>
        </HeaderContainer>
    );
};

export default SellerSimpleHeader;