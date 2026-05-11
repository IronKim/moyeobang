import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";
import InputField from "../../components/InputField";
import LoginDiv from "./components/LoginDiv";
import LoginText from "./components/LoginText";
import LoginInputDiv from "./components/LoginInputDiv";
import LoginButton from "./components/LoginButton";
import ProgressToast from "../../components/ProgressToast";
import {useChangeRoleType, useLogin} from "../../hooks/useUser";
import {ROLETYPE} from "../../constants/ROLETYPE";

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    letter-spacing: 2px;
`

const SignUpButton = styled.p`
    color: #007BFF;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

const AccountLogin = () => {
    const navigate = useNavigate();
    const changeRoleType = useChangeRoleType();
    const { login, isLoggingIn } = useLogin();

    useEffect(() => {
        changeRoleType(ROLETYPE.USER);
    }, [changeRoleType]);

    const [helperText, setHelperText] = useState({
        accountId: '',
        password: ''
    });

    const [inputdata, setInputData] = useState({
        accountId: '',
        password: ''
    });

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setInputData({
            ...inputdata,
            [name]: value
        });
    }

    const handleAccountChange = (e) => {
        setHelperText(prevState => ({
            ...prevState,
            accountId: ''
        }));
        const { value } = e.target;

        // 6~20자 넘어가면 입력이 안되도록 하는 조건문
        if (value.length > 20) {
            return;
        }

        // 영문, 숫자만 입력되도록 하는 조건문
        if (!/^[a-zA-Z0-9]*$/.test(value)) {
            setHelperText(prevState => ({
                ...prevState,
                accountId: '아이디는 영문, 숫자만 입력 가능합니다.'
            }));
            return;
        }

        inputHandler(e);
    }

    const handlePasswordChange = (e) => {
        setHelperText(prevState => ({
            ...prevState,
            password: '',
        }));
        const { value } = e.target;

        // 8~20자 넘어가면 입력이 안되도록 하는 조건문
        if (value.length > 20) {
            return;
        }

        // 영문, 숫자만 입력되도록 하는 조건문
        if (!/^[a-zA-Z0-9]*$/.test(value)) {
            setHelperText(prevState => ({
                ...prevState,
                password: '비밀번호는 영문, 숫자만 입력 가능합니다.'
            }));
            return;
        }

        inputHandler(e);
    }

    const handleLogin = (e) => {
        if (inputdata.accountId === '') {
            setHelperText(prevState => ({
                ...prevState,
                accountId: '아이디를 입력해주세요.'
            }));
            return;
        }

        if (inputdata.password === '') {
            setHelperText(prevState => ({
                ...prevState,
                password: '비밀번호를 입력해주세요.'
            }));
            return;
        }
        login(inputdata, ROLETYPE.USER);
    }

    return (
        <MainContainer height={'68.9852vh'} >
            <ProgressToast open={isLoggingIn} text={'로그인 처리 중입니다...'} />
            <MainBox>
                <LoginDiv>
                    <LoginText>로그인</LoginText>
                    <LoginInputDiv>
                        <InputField name='accountId' value={inputdata.accountId} onChange={handleAccountChange} label={'아이디'} helperText={helperText.accountId} onKeyDown={handleLogin} />
                        <InputField type='password' name='password' value={inputdata.password} onChange={handlePasswordChange} label={'비밀번호'} helperText={helperText.password} onKeyDown={handleLogin} />
                        <LoginButton onClick={handleLogin} disabled={isLoggingIn}>{isLoggingIn ? '로그인 중...' : '로그인'}</LoginButton>
                        계정이 없으신가요?&nbsp;
                        <ButtonDiv>
                            <SignUpButton onClick={() => navigate('/sign-up')} >회원가입</SignUpButton>
                        </ButtonDiv>  
                    </LoginInputDiv>
                </LoginDiv>
            </MainBox>
        </MainContainer>
    );
};

export default AccountLogin;