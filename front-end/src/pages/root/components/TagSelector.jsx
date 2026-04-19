import React, {useState} from 'react';
import styled, {css} from "styled-components";
import PropTypes from "prop-types";
import {Form} from "antd";

const Container = styled.div`
    &.custom-input-error {
        border: 1px solid #f5222d;
        border-radius: 6px;
    }
`

const TagDiv = styled.div`
    display: grid;
    grid-template-columns: ${props => props.gridTemplateColumns ? props.gridTemplateColumns : 'repeat(4, 1fr);'};
    gap: ${props => props.gap ? props.gap : '10px'};
    margin: 5px;
    
`

const Tag = styled.div`
    display: flex;
    width: 100px;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    border-radius: 5px;
    border: 1px solid #f8f8f8;
    box-shadow: 0 5px 4px 0 rgba(0, 0, 0, 0.1);
    gap: 5px;
    line-height: 32px;
    transition: all 0.3s;
    font-size: 16px;

    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &:hover {
        cursor: pointer;
        background-color: #eeeeee;
        box-shadow: none;
    }

    @media (max-width: 1200px) {
        padding-top: 5px;
        padding-bottom: 5px;
        line-height: 16px;
        width: 100%;
        flex-direction: column;
    }

    ${props =>
    props.selected &&
    css`
                background-color: #007BFF;
                color: #fff;
                box-shadow: none;
                
                &:hover {
                    background-color: #0056b3;
                }
            `
}
    ${props =>
    props.disabled &&
    css`
                background-color: #ccc;
                box-shadow: none;
                color: #000;
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
            setSelectedTags(selectedTags.filter(t => t !== tag));
            onChange && onChange(value.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
            onChange && onChange([...value, tag]);
        }
    };

    const { status, errors } = Form.Item.useStatus();

    return (
        <Container className={`custom-input-${status}`}>
            {help && <p style={{
                marginLeft: '5px',
                lineHeight: '32px',
                color: 'gray'
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