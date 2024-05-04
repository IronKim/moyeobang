import React from 'react';
import styled from "styled-components";


const Div = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 270px;
`

const LoginInputDiv = ({children}) => {
    return (
        <Div>
            {children}
        </Div>
    );
};

export default LoginInputDiv;