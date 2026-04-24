import React from 'react';
import {Map, MapMarker} from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import addressImage from '../../../assets/images/Address.png';
import {InfoCard, PreviewLabel} from './SellerHomeComponents';

const PreviewTitle = styled.h4`
    margin: 0 0 12px;
    color: var(--color-gray-900);
    font-size: 20px;
`;

const MapFrame = styled.div`
    overflow: hidden;
    border-radius: 18px;
    background: var(--color-blue-100);
    box-shadow: inset 0 0 0 1px var(--color-rgba-card-border);
`;

const MapPreview = ({latitude, longitude}) => {
    const hasPosition = latitude && longitude;

    return (
        <InfoCard
            cardRadius={'24px'}
            cardPadding={'20px'}
            cardShadow={'0 16px 32px var(--color-rgba-card-shadow)'}
        >
            <PreviewLabel>Live Preview</PreviewLabel>
            <PreviewTitle>지도</PreviewTitle>
            <MapFrame>
                {hasPosition ? (
                    <Map
                        center={{lat: latitude, lng: longitude}}
                        style={{width: '100%', height: '360px'}}
                        draggable={false}
                    >
                        <MapMarker position={{lat: latitude, lng: longitude}} />
                    </Map>
                ) : (
                    <img
                        src={addressImage}
                        alt="address"
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '360px',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </MapFrame>
        </InfoCard>
    );
};

export default MapPreview;
