import React, {useState} from 'react';
import styled, {css} from "styled-components";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 5px 4px 4px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 1200px) {
        width: 80%;
        margin: 0 auto;
        height: 120px;
        padding: 0;
        text-align: center;
    }

    ${props =>
            props.disabled &&
            css`
                filter: brightness(70%);
                background-color: #fff;
                box-shadow: none;
                pointer-events: none;
            `
    }
`;

const ArrowButton = styled.button`
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    font-size: 18px;
    margin: 5px;
    width: 30%;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const TimeDisplay = styled.div`
    font-size: 24px;
    margin: 10px;
    width: 60%;
    text-align: center;
`;

const ResetButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ff0000;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    font-size: 12px;
    width: 45px;

    &:hover {
        background-color: #cc0000;
    }

    @media (max-width: 1200px) {
        width: 80px;
    }
`;

const MinuteSelector = ({value, onChange, disabled}) => {
    const [minutes, setMinutes] = useState(value ? value : 60);

    const incrementMinutes = () => {
        const m = minutes + 5;
        setMinutes(m);
        onChange && onChange(m);
    };

    const decrementMinutes = () => {
        const m = minutes - 5;
        setMinutes(m);
        onChange && onChange(m);
    };

    const resetMinutes = () => {
        setMinutes(60);
        onChange && onChange(60);
    };

    return (
        <Container disabled={disabled}>
            <ArrowButton type={'button'} onClick={decrementMinutes} disabled={minutes <= 5}>◀</ArrowButton>
            <TimeDisplay>{minutes.toString().padStart(2, '0')}분</TimeDisplay>
            <ArrowButton type={'button'} onClick={incrementMinutes} disabled={minutes >= 600}>▶</ArrowButton>
            <ResetButton type={'button'} onClick={resetMinutes}>초기화</ResetButton>
        </Container>
    );
};

export default MinuteSelector;