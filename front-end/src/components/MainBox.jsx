import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    position: relative;
    top: ${props => props.top ? props.top : '-150px'};
    border-radius: 25px;
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
    margin: 0 auto;
    width: ${props => props.width ? props.width : '60.9375vw'};
    height: ${props => props.height ? props.height : '63.3333vh'};
    
    @media (max-width: 1200px) {
        position: static;
        width: 100%;
        margin-bottom: 40px;
        border-radius: 0;
        height: 100%;
    }
`

const MainBox = ({ top, backgroundColor, width, height, style, children }) => {
    return (
        <Box top={top} backgroundColor={backgroundColor} width={width} height={height} style={style}>
            {children}
        </Box>
    );
};

export default MainBox;