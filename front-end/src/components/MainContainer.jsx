import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: ${props => props.$backgroundColor ? props.$backgroundColor : 'white'};
    width: ${props => props.width ? props.width : '100%'};
    height: ${props => props.height ? props.height : '100%'};
`

const MainContainer = ({ backgroundColor, width, height, children }) => {
    return (
        <Container $backgroundColor={backgroundColor} width={width} height={height} >
            {children}
        </Container>
    );
};

export default MainContainer;