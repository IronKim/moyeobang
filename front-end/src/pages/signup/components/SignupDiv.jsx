import React from 'react';
import styled from "styled-components";

const Div = styled.div`
    margin: 0 auto;
    width: 416px;
    height: 100%;
    
    @media (max-width: 1200px) {
        width: 100%;
    }
`

const SignupDiv = ({children}) => {
    return (
        <Div>
            {children}
        </Div>
    );
};

export default SignupDiv;