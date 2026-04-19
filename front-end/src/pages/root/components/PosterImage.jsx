import React, {useRef, useState} from 'react';
import styled from "styled-components";
import basicPosterImg from "../../../assets/images/BasicPoster.png";
import Swal from "sweetalert2";
import basicProfileImg from "../../../assets/images/BasicProfileImg.png";
import {Form} from "antd";

const PosterImageContainer = styled.div`
    width: 150px;
    height: 210px;
    cursor: pointer;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16);

    &.custom-input-error {
        border: 1px solid #f5222d;
    }

    &:hover {
        cursor: pointer;
        filter: brightness(0.9);
    }

    @media (max-width: 1200px) {
        width: 200px;
        height: 280px;
        margin: 0 auto;
    }
    
    ${props => props.disabled && `
        pointer-events: none;
        filter: brightness(0.8);
        border: 1px solid #ccc;
    `}
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const PosterImage = ({value, onChange, disabled}) => {
    const inputRef = useRef(null);
    const [posterImage, setPosterImage] = useState(basicPosterImg);
    const [url, setUrl] = useState('');
    const { status, errors } = Form.Item.useStatus();


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