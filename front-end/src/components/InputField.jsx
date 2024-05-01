import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Input = styled(TextField)`
        border-radius: 15px;
        background-color: #F4F1F1;
        font-size: 16px;
        width: 90%;
        height: 60px;

        .MuiOutlinedInput-notchedOutline {
            border-color: ${props => props.error ? 'red' : '#F4F1F1'};
        }
        
        .MuiFormLabel-root.Mui-focused {
            color: black;
            font-family: 'Pretendard-Regular',serif;
        }

        .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: black;
            border-width: 1px;
        }

        .Mui-focused:focus {
            border-color: black;
            outline-color: black;
        }
        
        .MuiFormLabel-root {
            font-family: 'Pretendard-Regular',serif;
        }
        
        .MuiInputBase-root {
            font-family: 'Pretendard-Regular',serif;  
            background-color: #F4F1F1;
            border-radius: 15px;
        }
    `
const InputField = ({name, type, value, onChange, label, error, helperText}) => {
    return (
        <Input name={name} type={type} value={value} variant='outlined' onChange={onChange} label={label} error={error} helperText={helperText} />
    );
};

export default InputField;