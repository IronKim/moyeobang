import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from "../../../components/InputField";
import { useBeforeunload } from "react-beforeunload";
import { BsArrowRightCircleFill } from "react-icons/bs";
import SignupDiv from "./SignupDiv";
import SignupText from "./SignupText";
import SignupInputDiv from "./SignupInputDiv";
import { useSignupDupChecks } from "../../../hooks/useSignupDupChecks";
import { phone } from "../../../utils/formatters";
import {
    validateAccount,
    validatePassword,
    validateName,
    validatePhoneNumber,
    validateEmail,
} from "../../../utils/validation";

const NextButton = styled(BsArrowRightCircleFill)`
    font-size: 36pt;
    color: black;
    margin-top: 20px;
    &:hover {
        cursor: pointer;
    }
`

const AccountEssential = ({ inputAccountData, onInput, nextPage }) => {
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameMessage, setNameMessage] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');
    const {
        accountError,
        accountMessage,
        emailError,
        emailMessage,
        refetchAll,
    } = useSignupDupChecks(inputAccountData.accountId, inputAccountData.email);
    const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);

    const handleAccountIdChange = (e) => {
        if (e.target.value.length > 20) return;
        if (!/^[a-zA-Z0-9]*$/.test(e.target.value)) return;
        onInput(e);
    }

    const handlePasswordChange = (e) => {
        if (e.target.value.includes(' ')) return;
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
        const normalizedPhoneNumber = phone.normalize(e.target.value);

        if (normalizedPhoneNumber.length > 11) return;

        setPhoneNumberError(false);
        setPhoneNumberMessage('');
        onInput({ target: { name: e.target.name, value: normalizedPhoneNumber } });
    }

    const handleEmailChange = (e) => {
        if (e.target.value.length > 50) return;
        onInput(e);
    }

    const handleNextPage = async () => {
        if (!isNextButtonClicked) {
            setIsNextButtonClicked(true);

            const accountResult = validateAccount(inputAccountData.accountId);
            setAccountError(!accountResult.isValid);
            setAccountMessage(accountResult.message);

            const passwordResult = validatePassword(inputAccountData.password, inputAccountData.confirmPassword);
            setPasswordError(!passwordResult.isValid && passwordResult.field === 'password');
            setPasswordMessage(!passwordResult.isValid && passwordResult.field === 'password' ? passwordResult.message : '');
            setConfirmPasswordError(!passwordResult.isValid && passwordResult.field === 'confirmPassword');
            setConfirmPasswordMessage(!passwordResult.isValid && passwordResult.field === 'confirmPassword' ? passwordResult.message : '');

            const nameResult = validateName(inputAccountData.name);
            setNameError(!nameResult.isValid);
            setNameMessage(nameResult.message);

            const phoneResult = validatePhoneNumber(inputAccountData.phoneNumber);
            setPhoneNumberError(!phoneResult.isValid);
            setPhoneNumberMessage(phoneResult.message);

            const emailResult = validateEmail(inputAccountData.email);
            setEmailError(!emailResult.isValid);
            setEmailMessage(emailResult.message);

            if (accountResult.isValid && passwordResult.isValid && nameResult.isValid && phoneResult.isValid && emailResult.isValid) {
                try {
                    const { isDuplicatedAccount, isDuplicatedEmail } = await refetchAll();

                    setAccountError(isDuplicatedAccount);
                    setAccountMessage(isDuplicatedAccount ? '이미 사용중인 아이디입니다.' : '');

                    setEmailError(isDuplicatedEmail);
                    setEmailMessage(isDuplicatedEmail ? '이미 사용중인 이메일입니다.' : '');

                    if (!isDuplicatedAccount && !isDuplicatedEmail) {
                        nextPage();
                    }
                } catch (error) {
                    console.log(error);
                    setAccountError(true);
                    setAccountMessage('중복 확인에 실패했습니다. 다시 시도해주세요.');
                }
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
                <InputField name='accountId' value={inputAccountData.accountId} onChange={handleAccountIdChange} label='아이디(6~20자 영문, 숫자만 입력)' max={20} error={accountError} helperText={accountMessage} />
                <InputField name='password' type='password' value={inputAccountData.password} onChange={handlePasswordChange} label='비밀번호(8~20자 영문, 숫자 조합)' max={20} error={passwordError} helperText={passwordMessage} />
                <InputField name='confirmPassword' type='password' value={inputAccountData.confirmPassword} onChange={handlePasswordChange} label='비밀번호 확인' max={20} error={confirmPasswordError} helperText={confirmPasswordMessage} />
                <InputField name='name' value={inputAccountData.name} onChange={handleNameChange} label='이름' max={20} error={nameError} helperText={nameMessage} />
                <InputField name='phoneNumber' value={phone.format(inputAccountData.phoneNumber)} onChange={handlePhoneNumberChange} label='휴대폰 번호(숫자만 입력)' error={phoneNumberError} helperText={phoneNumberMessage} />
                <InputField name='email' value={inputAccountData.email} onChange={handleEmailChange} label='이메일' max={50} error={emailError} helperText={emailMessage} onKeyDown={handleNextPage} />
                <NextButton onClick={handleNextPage} />
            </SignupInputDiv>
        </SignupDiv>
    );
};

export default AccountEssential;