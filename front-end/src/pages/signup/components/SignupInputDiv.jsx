import React from 'react';
import styled from "styled-components";

const Div = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.gap ? props.gap : '30px'};
    width: 100%;
    height: ${props => props.height ? props.height : '800px'};
`

const SignupInputDiv = ({gap, height, children}) => {
    return (
        <Div gap={gap} height={height}>
            {children}
        </Div>
    );
};

export default SignupInputDiv;