import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Form} from "antd";

const Container = styled.div`
    &.custom-input-error {
        border: 1px solid #f5222d;
        border-radius: 6px;
    }
    
    @media (max-width: 1200px) {
        text-align: center;
    }
`;

const Button = styled.button`
    padding: 10px 15px;
    margin: 5px;
    font-size: 16px;
    cursor: pointer;
    background-color: ${props => (props.selected ? '#007BFF' : '#f8f8f8')};
    color: ${props => (props.selected ? '#fff' : '#000')};
    border: none;
    border-radius: 4px;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => (props.selected ? '#0056b3' : '#e0e0e0')};
    }
    
    &:disabled {
        background-color: #ccc;
        box-shadow: none;
        cursor: not-allowed;
    }
`;

const RangeSelector = ({value, length, disable, onChange}) => {
    const [selectedRange, setSelectedRange] = useState(value ? value : []);
    const [firstSelected, setFirstSelected] = useState(null);
    const { status, errors } = Form.Item.useStatus();

    const handleButtonClick = (number) => {
        if (firstSelected === null) {
            setFirstSelected(number);
            setSelectedRange([number]);
            onChange && onChange([number]);
        } else if (firstSelected === number) {
            setFirstSelected(null);
            setSelectedRange([]);
            onChange && onChange([]);
        } else {
            const newRange = firstSelected < number
                ? Array.from({ length: number - firstSelected + 1 }, (_, i) => i + firstSelected)
                : Array.from({ length: firstSelected - number + 1 }, (_, i) => i + number);
            setSelectedRange(newRange);
            setFirstSelected(number);
            onChange && onChange(newRange);
        }
    };

    const isSelected = (number) => selectedRange.includes(number);

    return (
        <Container className={`custom-input-${status}`}>
            {Array.from({length: length ? length : 6}, (_, i) => i + 1).map(number => (
                <Button
                    key={number}
                    selected={isSelected(number)}
                    onClick={() => handleButtonClick(number)}
                    disabled={disable}
                    type={'button'}
                >
                    {number}
                </Button>
            ))}
        </Container>
    );
};

export default RangeSelector;