import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/Logo.png';
import slogan from '../assets/images/Slogan.png';
import logoWhite from '../assets/images/Logo(White).png';
import sloganWhite from '../assets/images/Slogan(White).png';
import {useNavigate} from "react-router-dom";
import {ROLETYPE} from "../constants/ROLETYPE";
import UserMenuButton from "./UserMenuButton";
import {useRecoilValue} from "recoil";
import {userState} from "../atoms/userState";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${props => props.$roleType === ROLETYPE.USER ? '#D4EBFB' : '#202166'};
    width: 100%;
    height: 38.7593vh;
    
    @media (max-width: 1200px) {
        display: flex;
        flex-direction: row;
        height: 6.5555vh;
    }
`

const HeaderNavContainer = styled.div`
    width: 80%;
    height: 5.5555vh;
    
    @media (max-width: 1200px) {
        display: none;
    }
`

const Navs = styled.div`
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    padding-right: 40px;
`

const NavButton = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.$roleType === ROLETYPE.USER ? '#000000' : '#FFFFFF'};
    
    &:hover {
        cursor: pointer;
    }
`

const SloganLogoContainer = styled.div`
    margin: 53px auto 0 auto;
    height: 52px;
    
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
    const userData = useRecoilValue(userState);

    const handleNavigate = (url) => {
        navigate(url);
    }

    return (
        <HeaderContainer $roleType={userData.roleType}>
            <HeaderNavContainer>
                <Navs>
                    {
                        userData.accountId === '' ? <NavButton $roleType={userData.roleType} onClick={() => handleNavigate('/login/user')}>로그인</NavButton> : <UserMenuButton />
                    }
                    <NavButton $roleType={userData.roleType} onClick={() => handleNavigate('/')}>이벤트</NavButton>
                    <NavButton $roleType={userData.roleType} onClick={() => handleNavigate('/sign-up/user')}>고객센터</NavButton>
                </Navs>
            </HeaderNavContainer>
            <SloganLogoContainer onClick={() => handleNavigate('/')}>
                <Slogan src={userData.roleType === ROLETYPE.USER ? slogan : sloganWhite} />
                <Logo src={userData.roleType === ROLETYPE.USER ? logo : logoWhite} />
            </SloganLogoContainer>
        </HeaderContainer>
    );
};

export default Header;