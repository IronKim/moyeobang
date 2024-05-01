import React, {useState} from 'react';
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

const Div = styled.div`
    width: 90%;
`;

const Textarea = styled(TextField)`
    border-radius: 15px;
    background-color: #F4F1F1;
    font-size: 16px;
    width: 100%;
    position: relative;
    
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
    
`;

const TextCount = styled.div`
    font-size: 12px;
    color: #BDBDBD;
    text-align: right;
    margin-top: 5px;
    margin-right: 10px;
    position: sticky;
    right: 0;
    
`;


const TextareaField = ({name, value, label, placeholder, maxCount, onChange}) => {

    const [textCount, setTextCount] = useState(0);

    const onChangeHandler = (e) => {
        if(e.target.value.length > maxCount) return;
        onChange(e);
        setTextCount(e.target.value.length);
    }

    return (
        <Div>
            <Textarea name={name} value={value} label={label} multiline placeholder={placeholder} onChange={onChangeHandler} variant="outlined" />
            <TextCount>{textCount}/{maxCount}</TextCount>
        </Div>

    );
};

export default TextareaField;