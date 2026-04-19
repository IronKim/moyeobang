import React from 'react';
import styled from 'styled-components';
import {Form} from "antd";

// CustomInput 컴포넌트
const CustomInputWrapper = styled.div`
  input {
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: border-color 0.3s;

    &.custom-input-error {
        border-color: red;
        
    }
`;

const CustomInput = ({...props }) => {
    const { status, errors } = Form.Item.useStatus();

    console.log(status, errors);

    return (
        <CustomInputWrapper>
            <input className={`custom-input-${status}`} placeholder={(errors.length && errors[0]) || ''} />
        </CustomInputWrapper>
    );
};

export default CustomInput;
