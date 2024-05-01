import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/Logo.png';
import slogan from '../assets/images/Slogan.png';
import {useNavigate} from "react-router-dom";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #D4EBFB;
    width: 100%;
    height: 38.7593vh;
    
    @media (max-width: 1200px) {
        display: flex;
        flex-direction: row;
        height: 6.5555vh;
    }
`

const HeaderNavContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 5.5555vh;
    
    @media (max-width: 1200px) {
        display: none;
    }
`

const Navs = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    width: 20%;
    margin-top: 20px;
    margin-right: 200px;
`

const NavButton = styled.h3`
    font-size: 20px;
    font-weight: bold;
    
    &:hover {
        cursor: pointer;
    }
`

const SloganLogoContainer = styled.div`
    margin: 2.7777vw auto 0 auto;
    height: 5.5555vh;
    
    &:hover {
        cursor: pointer;
    }
    
    @media (max-width: 1200px) {
        margin: 0 auto;
        height: 100%;
    }
`

const Slogan = styled.img`
    height: 100%;
    margin-right: 50px;
    
    @media (max-width: 1200px) {
        display: none;
    }
`

const Logo = styled.img`
    height: 100%;

    @media (max-width: 1200px) {
        width: 100%;
        height: 100%;
    }
`


const Header = () => {
    const navigate = useNavigate();

    const handleNavigate = (url) => {
        navigate(url);
    }

    return (
        <HeaderContainer>
            <HeaderNavContainer>
                <Navs>
                    <NavButton onClick={() => handleNavigate('/login/user')}>로그인</NavButton>
                    <NavButton onClick={() => handleNavigate('/sign-up/user')}>회원가입</NavButton>
                    <NavButton onClick={() => handleNavigate('/')}>이벤트</NavButton>
                </Navs>
            </HeaderNavContainer>
            <SloganLogoContainer onClick={() => handleNavigate('/')}>
                <Slogan src={slogan} />
                <Logo src={logo} />
            </SloganLogoContainer>
        </HeaderContainer>
    );
};

export default Header;