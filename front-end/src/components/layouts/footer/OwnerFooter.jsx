import React from 'react';
import styled from "styled-components";

const FooterContainer = styled.div`
    display: flex;
    background-color: #202166;
    width: 100%;
    height: 9.2593vh;
    bottom: 0;

    @media (max-width: 1200px) {
        display: none;
    }
`

const OwnerFooter = () => {
    return (
        <FooterContainer>
            
        </FooterContainer>
    );
};

export default OwnerFooter;