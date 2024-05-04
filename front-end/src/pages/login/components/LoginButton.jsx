import React from 'react';
import styled from "styled-components";

const Button = styled.button`
    border-radius: 15px;
    background-color: #96C2F6;
    width: 90%;
    height: 50px;
    color: white;
    border: none;
    font-size: 16px;

    &:hover {
        cursor: pointer;
    }
`

const LoginButton = ({children, onClick}) => {
    return (
        <Button onClick={onClick}>
            {children}
        </Button>
    );
};

export default LoginButton;