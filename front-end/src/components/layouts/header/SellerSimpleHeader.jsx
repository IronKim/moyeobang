import React from 'react';
import styled from "styled-components";
import logoWhite from '../../../assets/images/Logo(White).png';

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

const LogoContainer = styled.div`
    margin-top: 30px;
    margin-left: 100px;
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

const SellerSimpleHeader = () => {
    return (
        <HeaderContainer>
            <LogoContainer>
                <Logo src={logoWhite} alt='logo' />
                <span style={{color: 'white', marginLeft: '10px', textDecoration: 'underline'}}>사업자</span>
            </LogoContainer>
        </HeaderContainer>
    );
};

export default SellerSimpleHeader;