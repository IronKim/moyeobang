import React from 'react';
import styled from "styled-components";
import logoWhite from '../../../assets/images/Logo(White).png';
import {useNavigate} from "react-router-dom";

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

const SellerSimpleHeader = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <HeaderRow>
                <LogoContainer>
                    <Logo src={logoWhite} alt='logo' onClick={() => navigate('/')} />
                    <span style={{color: 'white', marginLeft: '10px', textDecoration: 'underline'}}>사업자</span>
                </LogoContainer>
            </HeaderRow>
        </HeaderContainer>
    );
};

export default SellerSimpleHeader;