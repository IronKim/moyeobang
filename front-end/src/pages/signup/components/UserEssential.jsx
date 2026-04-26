import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputField from "../../../components/InputField";
import { useBeforeunload } from "react-beforeunload";
import { BsArrowRightCircleFill } from "react-icons/bs";
import SignupDiv from "./SignupDiv";
import SignupText from "./SignupText";
import SignupInputDiv from "./SignupInputDiv";
import useDebounce from "../../../hooks/useDebounce";
import {
    validateAccount,
    validatePassword,
    validateName,
    validatePhoneNumber,
    validateEmail,
    checkAccountDup,
} from "../../../utils/validation";

const NextButton = styled(BsArrowRightCircleFill)`
    font-size: 36pt;
    color: black;
    margin-top: 20px;
    &:hover {
        cursor: pointer;
    }
`

const UserEssential = ({ inputuserData, onInput, nextPage }) => {
    const [accountError, setAccountError] = useState(false);
    const [accountMessage, setAccountMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameMessage, setNameMessage] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');

    const debounceQuery = useDebounce(inputuserData.accountId, 300);
    const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);

    useEffect(() => {
        if (!debounceQuery) return;
        const result = validateAccount(debounceQuery);
        if (!result.isValid) {
            setAccountError(true);
            setAccountMessage(result.message);
            return;
        }
        checkAccountDup(debounceQuery)
            .then(response => {
                if (response.data.result === true) {
                    setAccountError(true);
                    setAccountMessage('이미 사용중인 아이디입니다.');
                } else {
                    setAccountError(false);
                    setAccountMessage('');
                }
            })
            .catch(error => console.log(error));
    }, [debounceQuery]);

    const handleAccountIdChange = (e) => {
        if (e.target.value.length > 20) return;
        if (!/^[a-zA-Z0-9]*$/.test(e.target.value)) return;
        setAccountError(false);
        setAccountMessage('');
        onInput(e);
    }

    const handlePasswordChange = (e) => {
        if (e.target.value.length > 20) return;
        setPasswordError(false);
        setConfirmPasswordError(false);
        setPasswordMessage('');
        setConfirmPasswordMessage('');
        onInput(e);
    }

    const handleNameChange = (e) => {
        if (e.target.value.length > 20) return;
        if (!/^[가-힣ㄱ-ㅎa-zA-Z]*$/.test(e.target.value)) return;
        setNameError(false);
        setNameMessage('');
        onInput(e);
        onInput({ target: { name: 'profileName', value: e.target.value } });
    }

    const handlePhoneNumberChange = (e) => {
        if (e.target.value.length > 11) return;
        if (!/^[0-9]*$/.test(e.target.value)) return;
        setPhoneNumberError(false);
        setPhoneNumberMessage('');
        onInput(e);
    }

    const handleEmailChange = (e) => {
        if (e.target.value.length > 50) return;
        setEmailError(false);
        setEmailMessage('');
        onInput(e);
    }

    const handleNextPage = async () => {
        if (!isNextButtonClicked) {
            setIsNextButtonClicked(true);

            const accountResult = validateAccount(inputuserData.accountId);
            setAccountError(!accountResult.isValid);
            setAccountMessage(accountResult.message);

            const passwordResult = validatePassword(inputuserData.password, inputuserData.confirmPassword);
            setPasswordError(!passwordResult.isValid && passwordResult.field === 'password');
            setPasswordMessage(!passwordResult.isValid && passwordResult.field === 'password' ? passwordResult.message : '');
            setConfirmPasswordError(!passwordResult.isValid && passwordResult.field === 'confirmPassword');
            setConfirmPasswordMessage(!passwordResult.isValid && passwordResult.field === 'confirmPassword' ? passwordResult.message : '');

            const nameResult = validateName(inputuserData.name);
            setNameError(!nameResult.isValid);
            setNameMessage(nameResult.message);

            const phoneResult = validatePhoneNumber(inputuserData.phoneNumber);
            setPhoneNumberError(!phoneResult.isValid);
            setPhoneNumberMessage(phoneResult.message);

            const emailResult = validateEmail(inputuserData.email);
            setEmailError(!emailResult.isValid);
            setEmailMessage(emailResult.message);

            if (accountResult.isValid && passwordResult.isValid && nameResult.isValid && phoneResult.isValid && emailResult.isValid) {
                nextPage();
            }

            setTimeout(() => {
                setIsNextButtonClicked(false);
            }, 1000);
        }
    }

    // 창을 닫으려고 할 때 경고창을 띄우는 이벤트
    useBeforeunload((event) => event.preventDefault());

    return (
        <SignupDiv>
            <SignupText>회원가입(필수)</SignupText>
            <SignupInputDiv height={'600px'}>
                <InputField name='accountId' value={inputuserData.accountId} onChange={handleAccountIdChange} label='아이디(6~20자 영문, 숫자만 입력)' max={20} error={accountError} helperText={accountMessage} />
                <InputField name='password' type='password' value={inputuserData.password} onChange={handlePasswordChange} label='비밀번호(8~20자 영문, 숫자 조합)' max={20} error={passwordError} helperText={passwordMessage} />
                <InputField name='confirmPassword' type='password' value={inputuserData.confirmPassword} onChange={handlePasswordChange} label='비밀번호 확인' max={20} error={confirmPasswordError} helperText={confirmPasswordMessage} />
                <InputField name='name' value={inputuserData.name} onChange={handleNameChange} label='이름' max={20} error={nameError} helperText={nameMessage} />
                <InputField name='phoneNumber' value={inputuserData.phoneNumber} onChange={handlePhoneNumberChange} label='휴대폰 번호(숫자만 입력)' max={10} error={phoneNumberError} helperText={phoneNumberMessage} />
                <InputField name='email' value={inputuserData.email} onChange={handleEmailChange} label='이메일' max={50} error={emailError} helperText={emailMessage} onKeyDown={handleNextPage} />
                <NextButton onClick={handleNextPage} />
            </SignupInputDiv>
        </SignupDiv>
    );
};

export default UserEssential;