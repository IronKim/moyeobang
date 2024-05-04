import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import InputField from "../../../components/InputField";
import { useBeforeunload } from "react-beforeunload";
import { BsArrowRightCircleFill } from "react-icons/bs";
import {accountIdCheck} from "../../../api/AuthApiService";
import SignupDiv from "./SignupDiv";
import SignupText from "./SignupText";
import SignupInputDiv from "./SignupInputDiv";
import useDebounce from "../../../hooks/useDebounce";

const NextButton = styled(BsArrowRightCircleFill)`
    font-size: 36pt;
    color: black;
    margin-top: 20px;
    &:hover {
        cursor: pointer;
    }
`

const UserEssential = ({inputuserData, onInput, nextPage}) => {
    const [accountIdError, setAccountIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [helperText, setHelperText] = useState({
        accountId: '',
        password: '',
        confirmPassword: '',
        name: '',
        phoneNumber: '',
        email: '',
    });

    const debounceQuery = useDebounce(inputuserData.accountId, 300);
    const [isNextButtonClicked, setIsNextButtonClicked] = useState(false);

    useEffect(() => {
        if(debounceQuery){
            accountIdCheck(debounceQuery)
                .then((response) => {
                    if(response.data.result === true){
                        setAccountIdError(true);
                        setHelperText(prevState => ({
                            ...prevState,
                            accountId: '이미 사용중인 아이디입니다.'
                        }));
                    }
                }).catch((error) => {
                    console.log(error);
                });
        }
    }, [debounceQuery]);

    const handleAccountChange = (e) => {
        setAccountIdError(false);
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

        onInput(e);
    }

    const handlePasswordChange = (e) => {
        setPasswordError(false);
        setConfirmPasswordError(false);
        setHelperText(prevState => ({
            ...prevState,
            password: '',
            confirmPassword: ''
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

        onInput(e);
    }

    const handleNameChange = (e) => {
        setNameError(false);
        setHelperText(prevState => ({
            ...prevState,
            name: ''
        }));
        const { value } = e.target;

        // 2~20자 한글 영어만 입력되도록 하는 조건문
        if (value.length > 20) {
            return;
        }

        // ㄱ~ㅎ, 가~힣, 영어만 입력되도록 하는 조건문
        if (!/^[가-힣ㄱ-ㅎa-zA-Z]*$/.test(value)) {
            setHelperText(prevState => ({
                ...prevState,
                name: '이름은 한글, 영어만 입력 가능합니다.'
            }));
            return;
        }

        onInput(e);
        onInput({ target: { name: 'profileName', value: value } });
    }

    const handlePhoneNumberChange = (e) => {
        setPhoneNumberError(false);
        setHelperText(prevState => ({
            ...prevState,
            phoneNumber: ''
        }));
        const { value } = e.target;

        // 11자리 넘어가면 입력이 안되도록 하는 조건문
        if (value.length > 11) {
            return;
        }

        // 숫자만 입력되도록 하는 조건문
        if (!/^[0-9]*$/.test(value)) {
            setHelperText(prevState => ({
                ...prevState,
                phoneNumber: '휴대폰 번호는 숫자만 입력 가능합니다.'
            }));
            return;
        }

        onInput(e);
    }

    const handleEmailChange = (e) => {
        setEmailError(false);
        setHelperText(prevState => ({
            ...prevState,
            email: ''
        }));
        const { value } = e.target;

        // 50자리 넘어가면 입력이 안되도록 하는 조건문
        if (value.length > 50) {
            return;
        }

        onInput(e);
    }

    const handleNextPage = async () => {
        if(!isNextButtonClicked){
            setIsNextButtonClicked(true);

            let isValidation = true;

            //acountId가 6자리 이상인지 확인
            if (inputuserData.accountId.length < 6) {
                setAccountIdError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    accountId: '아이디는 6자리 이상이어야 합니다.'
                }));
                isValidation = false;
            }else {
                await accountIdCheck(debounceQuery)
                    .then((response) => {
                        if(response.data.result === true){
                            setAccountIdError(true);
                            setHelperText(prevState => ({
                                ...prevState,
                                accountId: '이미 사용중인 아이디입니다.'
                            }));
                            isValidation = false;
                        }
                    }).catch((error) => {
                        console.log(error);
                        isValidation = false;
                    });
            }

            //password가 8자리 이상인지 확인 && password와 confirmPassword이 같은지 확인 && password가 ^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$") 형식인지 확인
            if (inputuserData.password.length < 8) {
                setPasswordError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    password: '비밀번호는 8자리 이상이어야 합니다.'
                }));
                isValidation = false;
            } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(inputuserData.password)) {
                setPasswordError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    password: '비밀번호는 영문, 숫자 조합이어야 합니다.'
                }));
                isValidation = false;
            } else if(inputuserData.password !== inputuserData.confirmPassword){
                setConfirmPasswordError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    confirmPassword: '비밀번호 확인이 일치하지 않습니다.'
                }));
                isValidation = false;
            }

            //name이 2자리 이상인지 확인 && name이 한글, 영어로만 이루어졌는지 확인
            if (inputuserData.name.length < 2 || !/^[가-힣a-zA-Z]*$/.test(inputuserData.name)) {
                setNameError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    name: '올바르지않은 이름 형식입니다.'
                }));
                isValidation = false;
            }

            //phoneNumber이 ^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$") 형식인지 확인
            if (!/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(inputuserData.phoneNumber)) {
                setPhoneNumberError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    phoneNumber: '올바르지 않은 휴대폰 번호 형식입니다.'
                }));
                isValidation = false;
            }

            //email이 이메일 형식인지 확인
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputuserData.email)) {
                setEmailError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    email: '올바르지 않은 이메일 형식입니다.'
                }));
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
                <InputField name='accountId' error={accountIdError} value={inputuserData.accountId} onChange={handleAccountChange} label='아이디(6~20자 영문, 숫자만 입력)' helperText={helperText.accountId} />
                <InputField name='password' error={passwordError} value={inputuserData.password} onChange={handlePasswordChange} type='password' label='비밀번호(8~20자 영문, 숫자 조합)' helperText={helperText.password} />
                <InputField name='confirmPassword' error={confirmPasswordError} onChange={handlePasswordChange} type='password' label='비밀번호 확인' helperText={helperText.confirmPassword} />
                <InputField name='name' error={nameError} value={inputuserData.name} onChange={handleNameChange} label='이름' helperText={helperText.name} />
                <InputField name='phoneNumber' error={phoneNumberError} value={inputuserData.phoneNumber} onChange={handlePhoneNumberChange} label='휴대폰 번호(숫자만 입력)' helperText={helperText.phoneNumber} />
                <InputField name='email' error={emailError} value={inputuserData.email} onChange={handleEmailChange} label='이메일' helperText={helperText.email} onKeyDown={handleNextPage} />
                <NextButton onClick={handleNextPage} />
            </SignupInputDiv>
        </SignupDiv>
    );
};

export default UserEssential;