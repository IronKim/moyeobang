import React, {useState} from 'react';
import styled from "styled-components";
import {Form} from "antd";
import "../../../css/theme-colors.css";

const Container = styled.div`
    &.custom-input-error {
        border: 1px solid #f5222d;
        border-radius: 6px;
        padding: 6px;
    }
    
    @media (max-width: 1200px) {
        text-align: center;
    }
`;

const Button = styled.button`
    min-width: 54px;
    height: 44px;
    padding: 8px 12px;
    margin: 5px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    background: ${props => (props.selected
        ? 'linear-gradient(135deg, var(--color-blue-650) 0%, var(--color-blue-500) 100%)'
        : 'var(--color-blue-060)')};
    color: ${props => (props.selected ? 'var(--color-white)' : 'var(--color-gray-900)')};
    border: 1px solid ${props => (props.selected ? 'transparent' : 'var(--color-border-input)')};
    border-radius: 10px;
    box-shadow: 0 4px 10px var(--color-rgba-card-shadow);
    transition: all 0.2s;

    &:hover {
        background: ${props => (props.selected
        ? 'linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-600) 100%)'
        : 'var(--color-blue-090)')};
        border-color: ${props => (props.selected ? 'transparent' : 'var(--color-blue-450)')};
    }
    
    &:disabled {
        background-color: #d1d5db;
        color: var(--color-gray-700);
        box-shadow: none;
        cursor: not-allowed;
        border-color: transparent;
    }
`;

const RangeSelector = ({value, length, disable, onChange}) => {
    const [selectedRange, setSelectedRange] = useState(value ? value : []);
    const [firstSelected, setFirstSelected] = useState(null);
    const { status } = Form.Item.useStatus();

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