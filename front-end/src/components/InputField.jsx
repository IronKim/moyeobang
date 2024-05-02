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
            font-family: 'Pretendard-Regular';
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
            font-family: 'Pretendard-Regular';
        }
        
        .MuiInputBase-root {
            font-family: 'Pretendard-Regular';  
            background-color: #F4F1F1;
            border-radius: 15px;
        }
    `
const InputField = ({name, type, value, onChange, label, error, helperText, onKeyDown}) => {

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            onKeyDown();
        }
    }

    return (
        <Input name={name} type={type} value={value} variant='outlined' onChange={onChange} label={label} error={error} helperText={helperText} onKeyDown={handleKeyDown} />
    );
};

export default InputField;