import React, {useState} from 'react';
import styled, {css} from "styled-components";
import PropTypes from "prop-types";
import {Form} from "antd";
import "../../../css/theme-colors.css";

const Container = styled.div`
    &.custom-input-error {
        border: 1px solid #f5222d;
        border-radius: 6px;
        padding: 6px;
    }
`

const TagDiv = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: ${props => props.gridTemplateColumns ? props.gridTemplateColumns : 'repeat(4, 1fr);'};
    gap: ${props => props.gap ? props.gap : '10px'};
    margin: 5px;
    
`

const Tag = styled.div`
    display: flex;
    width: 80%;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    background-color: var(--color-blue-060);
    border-radius: 10px;
    border: 1px solid var(--color-border-input);
    box-shadow: 0 5px 10px var(--color-rgba-card-shadow);
    gap: 8px;
    line-height: 20px;
    padding: 10px 8px;
    transition: all 0.3s;
    font-size: 16px;
    color: var(--color-gray-900);

    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &:hover {
        cursor: pointer;
        background-color: var(--color-blue-090);
        border-color: var(--color-blue-450);
        box-shadow: none;
    }

    @media (max-width: 1200px) {
        padding-top: 5px;
        padding-bottom: 5px;
        line-height: 16px;
        width: 100%;
        flex-direction: column;
        gap: 6px;
    }

    svg {
        font-size: 18px;
        flex-shrink: 0;
    }

    p {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.25;
        text-align: center;
    }

    ${props =>
    props.selected &&
    css`
                background: linear-gradient(135deg, var(--color-blue-650) 0%, var(--color-blue-500) 100%);
                color: var(--color-white);
                border-color: transparent;
                box-shadow: none;
                
                &:hover {
                    background: linear-gradient(135deg, var(--color-blue-900) 0%, var(--color-blue-600) 100%);
                }
            `
}
    ${props =>
    props.disabled &&
    css`
                background-color: #d1d5db;
                box-shadow: none;
                color: var(--color-gray-700);
            `
}
`

TagDiv.propTypes = {
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
}

const TagSelector = ({value, onChange, help, tags, disabled}) => {
    const [selectedTags, setSelectedTags] = useState(value ? value : []);

    const toggleSelect = (tag) => {
        if (selectedTags.includes(tag)) {
            const next = selectedTags.filter(t => t !== tag);
            setSelectedTags(next);
            onChange && onChange(next);
        } else {
            const next = [...selectedTags, tag];
            setSelectedTags(next);
            onChange && onChange(next);
        }
    };

    const { status } = Form.Item.useStatus();

    return (
        <Container className={`custom-input-${status}`}>
            {help && <p style={{
                marginLeft: '5px',
                lineHeight: '22px',
                color: 'var(--color-gray-500)',
                fontSize: '12px'
            }}>{help}</p>}
            <TagDiv>
                {tags.map((tag, index) => (
                    <Tag
                        key={index}
                        selected={selectedTags.includes(tag.label)}
                        onClick={() => !disabled && toggleSelect(tag.label)}
                        disabled={disabled}
                    >
                        {tag.icon}
                        <p>{tag.label}</p>
                    </Tag>
                ))}
            </TagDiv>
        </Container>
    );
};

export default TagSelector;