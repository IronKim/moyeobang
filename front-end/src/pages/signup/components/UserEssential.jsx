import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import InputField from "../../../components/InputField";
import {useBeforeunload} from "react-beforeunload";
import {BsArrowRightCircleFill} from "react-icons/bs";
import SignupDiv from "./SignupDiv";
import SignupText from "./SignupText";
import SignupInputDiv from "./SignupInputDiv";
import useDebounce from "../../../hooks/useDebounce";
import {
    useCheckAccountValidation,
    useCheckEmailValidation,
    useCheckNameValidation,
    useCheckPasswordValidation,
    useCheckPhoneNumberValidation
} from "../../../hooks/useUser";

const NextButton = styled(BsArrowRightCircleFill)`
    font-size: 36pt;
    color: black;
    margin-top: 20px;
    &:hover {
        cursor: pointer;
    }
`

const UserEssential = ({inputuserData, onInput, nextPage}) => {
    const {accountValidator, accountError, accountMessage} = useCheckAccountValidation();
    const {passwordValidator, passwordError, confirmPasswordError, passwordMessage, confirmPasswordMessage } = useCheckPasswordValidation();
    const {nameValidator, nameError, nameMessage} = useCheckNameValidation();
    const {phoneNumberValidator, phoneNumberError, phoneNumberMessage} = useCheckPhoneNumberValidation();
    const {emailValidator, emailError, emailMessage} = useCheckEmailValidation();

    const debounceQuery = useDebounce(inputuserData.accountId, 300);
    const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);

    useEffect(() => {
        debounceQuery && accountValidator(debounceQuery, true);
    }, [debounceQuery]);

    const handleAccountIdChange = (e) => {
        onInput(e);
    }

    const handlePasswordChange = (e) => {
        passwordValidator(inputuserData.password, inputuserData.confirmPassword, true);
        onInput(e);
    }

    const handleNameChange = (e) => {
        nameValidator(inputuserData.name, true);
        onInput(e);
        onInput({ target: { name: 'profileName', value: e.target.value } });
    }

    const handlePhoneNumberChange = (e) => {
        if (!/^[0-9]*$/.test(e.target.value)) {
            return;
        }
        phoneNumberValidator(inputuserData.phoneNumber, true);
        onInput(e);
    }

    const handleEmailChange = (e) => {
        emailValidator(inputuserData.email, true);
        onInput(e);
    }

    const handleNextPage = async () => {
        if(!isNextButtonClicked){
            setIsNextButtonClicked(true);

            let isValidation = true;

            accountValidator(inputuserData.accountId);
            passwordValidator(inputuserData.password, inputuserData.confirmPassword, false);
            nameValidator(inputuserData.name);
            phoneNumberValidator(inputuserData.phoneNumber);
            emailValidator(inputuserData.email);

            if(accountError) {
                isValidation = false;
            } else if(passwordError || confirmPasswordError) {
                isValidation = false;
            } else if(nameError) {
                isValidation = false;
            } else if(phoneNumberError) {
                isValidation = false;
            } else if(emailError) {
                isValidation = false;
            }

            if(isValidation){
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