import styled from "styled-components";
import PropTypes from "prop-types";
import Title from "antd/lib/typography/Title";
import {Button, Form, Rate} from "antd";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 1200px) {
        width: 100%;
    }
`
//940px

export const FormContainer = styled(Form)`
    margin-left: ${props => props.marginLeft ? props.marginLeft : '20px'};
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    
    @media (max-width: 1200px) {
        margin-left: 0;
    }
`

export const ParagraphDiv = styled.div`
        width: ${props => props.width ? props.width : '100%'};
        display: flex;
        flex-direction: row;
    
    @media (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
    }
`
ParagraphDiv.propTypes = {
    width: PropTypes.string,
    marginLeft: PropTypes.string,
}

export const RequiredSpan = styled.span`
    color: red;
    margin-right: 5px;
    font-size: 14px;
    font-weight: normal;
`

export const TitleDiv = styled(Title)`
    width: ${props => props.width ? props.width : '110px'};
    text-align: left;

    @media (max-width: 1200px) {
        width: 100%;
        text-align: center;
    }
`

TitleDiv.propTypes = {
    width: PropTypes.string,
}

export const ItemDiv = styled(Form.Item)`
    margin: 0;
    width: ${props => props.width ? props.width : '100%'};
    
    @media (max-width: 1200px) {
        width: 100%;
        text-align: center;
    }
`

ItemDiv.propTypes = {
    width: PropTypes.string,
}

export const RateDiv = styled(Rate)`
    line-height: 32px;
    text-align: left;
    font-size: 20px;
    
    color: ${props => props.color ? props.color : '#f8d914'};
    
    @media (max-width: 1200px) {
        text-align: center;
        font-size: 32px;
    }
`

RateDiv.propTypes = {
    color: PropTypes.string,
}


export const SubmitButton = styled(Button)`
    width: 100px;
    height: 40px;
    margin-top: 20px;
    text-align: center;
`
