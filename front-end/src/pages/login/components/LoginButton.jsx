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

    &:disabled {
        background-color: #b8cde7;
        cursor: not-allowed;
        opacity: 0.8;
    }
`

const LoginButton = ({children, onClick, disabled = false}) => {
    return (
        <Button onClick={onClick} disabled={disabled}>
            {children}
        </Button>
    );
};

export default LoginButton;