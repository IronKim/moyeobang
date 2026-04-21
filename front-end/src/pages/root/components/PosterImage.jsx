import React, {useRef, useState} from 'react';
import styled from "styled-components";
import basicPosterImg from "../../../assets/images/BasicPoster.png";
import {Form} from "antd";
import "../../../css/theme-colors.css";

const PosterImageContainer = styled.div`
    width: 150px;
    height: 210px;
    cursor: pointer;
    border-radius: 14px;
    overflow: hidden;
    background: var(--color-blue-060);
    border: 1px solid var(--color-border-input);
    box-shadow: 0 8px 16px var(--color-rgba-card-shadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

    &.custom-input-error {
        border: 1px solid #f5222d;
    }

    &:hover {
        cursor: pointer;
        transform: translateY(-2px);
        box-shadow: 0 12px 20px var(--color-rgba-card-shadow);
        filter: brightness(0.98);
    }

    @media (max-width: 1200px) {
        width: 200px;
        height: 280px;
        margin: 0 auto;
    }
    
    ${props => props.disabled && `
        pointer-events: none;
        filter: brightness(0.8);
        border: 1px solid #d1d5db;
        box-shadow: none;
    `}
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const PosterImage = ({value, onChange, disabled}) => {
    const inputRef = useRef(null);
    const [posterImage, setPosterImage] = useState(basicPosterImg);
    const [url, setUrl] = useState('');
    const { status } = Form.Item.useStatus();


    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (url) {
                URL.revokeObjectURL(url);
            }
            const blobUrl = URL.createObjectURL(file);
            setUrl(blobUrl);
            setPosterImage(blobUrl);
            e.target.value = null;

            if (onChange) {
                onChange(blobUrl);
            }
        }
    };

    return (
        <PosterImageContainer className={`custom-input-${status}`} onClick={handleClick} disabled={disabled}>
            <Image alt={'poster'} src={posterImage} />
            <input type="file" ref={inputRef} style={{display: 'none'}} accept={'image/*'} onChange={handleFileChange} />
        </PosterImageContainer>
    );
};

export default PosterImage;