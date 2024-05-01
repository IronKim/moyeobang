import React from 'react';
import styled from "styled-components";

const Text = styled.p`
    padding-top: 60px;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
`

const SignupText = ({children}) => {
    return (
        <Text>{children}</Text>
    );
};

export default SignupText;