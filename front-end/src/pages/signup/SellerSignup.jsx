import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";
import useDebounce from "../../hooks/useDebounce";
import { sellerJoin } from "../../api/AuthApiService";
import SignupText from "./components/SignupText";
import SignupInputDiv from "./components/SignupInputDiv";
import InputField from "../../components/InputField";
import styled from "styled-components";
import SignupDiv from "./components/SignupDiv";
import { useBeforeunload } from "react-beforeunload";
import {
    validateAccount,
    validatePassword,
    validateName,
    validatePhoneNumber,
    validateEmail,
    checkAccountDup,
} from "../../utils/validation";

const SignupButton = styled.button`
    font-size: 20px;
    width: 90%;
    height: 60px;
    border-radius: 15px;
    background-color: #96C2F6;
    border: none;
    color: white;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
`

const SellerSignup = () => {
    const navigate = useNavigate();

    const [inputSellerData, setInputSellerData] = useState({
        accountId: '',
        password: '',
        confirmPassword: '',
        name: '',
        phoneNumber: '',
        email: '',
        businessName: '',
        businessNumber: '',
    });

    const onInput = (e) => {
        const { name, value } = e.target;
        setInputSellerData((prevInputSellerData) => ({
            ...prevInputSellerData,
            [name]: value,
        }));
    };

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
    const [businessNameError, setBusinessNameError] = useState(false);
    const [businessNameMessage, setBusinessNameMessage] = useState('');
    const [businessNumberError, setBusinessNumberError] = useState(false);
    const [businessNumberMessage, setBusinessNumberMessage] = useState('');

    const debounceQuery = useDebounce(inputSellerData.accountId, 300);
    const [isSignupButtonClicked, setIsSignupButtonClicked] = useState(false);

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

    const handleAccountChange = (e) => {
        if (e.target.value.length > 20) return;
        if (!/^[a-zA-Z0-9]*$/.test(e.target.value)) return;
        setAccountError(false);
        setAccountMessage('');
        onInput(e);
    };

    const handlePasswordChange = (e) => {
        if (e.target.value.length > 20) return;
        setPasswordError(false);
        setConfirmPasswordError(false);
        setPasswordMessage('');
        setConfirmPasswordMessage('');
        onInput(e);
    };

    const handleNameChange = (e) => {
        if (e.target.value.length > 20) return;
        if (!/^[가-힣ㄱ-ㅎa-zA-Z]*$/.test(e.target.value)) return;
        setNameError(false);
        setNameMessage('');
        onInput(e);
    };

    const handlePhoneNumberChange = (e) => {
        if (e.target.value.length > 11) return;
        if (!/^[0-9]*$/.test(e.target.value)) return;
        setPhoneNumberError(false);
        setPhoneNumberMessage('');
        onInput(e);
    };

    const handleEmailChange = (e) => {
        if (e.target.value.length > 50) return;
        setEmailError(false);
        setEmailMessage('');
        onInput(e);
    };

    const handleBusinessNameChange = (e) => {
        if (e.target.value.length > 20) return;
        setBusinessNameError(false);
        setBusinessNameMessage('');
        onInput(e);
    };

    const handleBusinessNumberChange = (e) => {
        if (e.target.value.length > 10) return;
        if (!/^[0-9]*$/.test(e.target.value)) return;
        setBusinessNumberError(false);
        setBusinessNumberMessage('');
        onInput(e);
    };

    const validationCheck = () => {
        if (!isSignupButtonClicked) {
            setIsSignupButtonClicked(true);

            const accountResult = validateAccount(inputSellerData.accountId);
            setAccountError(!accountResult.isValid);
            setAccountMessage(accountResult.message);

            const passwordResult = validatePassword(inputSellerData.password, inputSellerData.confirmPassword);
            setPasswordError(!passwordResult.isValid && passwordResult.field === 'password');
            setPasswordMessage(!passwordResult.isValid && passwordResult.field === 'password' ? passwordResult.message : '');
            setConfirmPasswordError(!passwordResult.isValid && passwordResult.field === 'confirmPassword');
            setConfirmPasswordMessage(!passwordResult.isValid && passwordResult.field === 'confirmPassword' ? passwordResult.message : '');

            const nameResult = validateName(inputSellerData.name);
            setNameError(!nameResult.isValid);
            setNameMessage(nameResult.message);

            const phoneResult = validatePhoneNumber(inputSellerData.phoneNumber);
            setPhoneNumberError(!phoneResult.isValid);
            setPhoneNumberMessage(phoneResult.message);

            const emailResult = validateEmail(inputSellerData.email);
            setEmailError(!emailResult.isValid);
            setEmailMessage(emailResult.message);

            const isBusinessNameValid = inputSellerData.businessName.length >= 2;
            setBusinessNameError(!isBusinessNameValid);
            setBusinessNameMessage(!isBusinessNameValid ? '상호명은 2자리 이상이어야 합니다.' : '');

            const isBusinessNumberValid = inputSellerData.businessNumber.length === 10;
            setBusinessNumberError(!isBusinessNumberValid);
            setBusinessNumberMessage(!isBusinessNumberValid ? '사업자 번호는 10자리여야 합니다.' : '');

            if (accountResult.isValid && passwordResult.isValid && nameResult.isValid && phoneResult.isValid && emailResult.isValid && isBusinessNameValid && isBusinessNumberValid) {
                signup();
            }

            setTimeout(() => {
                setIsSignupButtonClicked(false);
            }, 1000);
        }
    };

    const signup = () => {
        let userData = {
            accountId: inputSellerData.accountId,
            password: inputSellerData.password,
            name: inputSellerData.name,
            phoneNumber: inputSellerData.phoneNumber,
            email: inputSellerData.email,
            businessName: inputSellerData.businessName,
            businessNumber: inputSellerData.businessNumber,
        };

        sellerJoin(userData)
            .then(() => { afterSignup(); })
            .catch((error) => {
                console.log(error);
                errorSignup();
            });
    };

    const afterSignup = () => {
        Swal.fire({
            icon: 'success',
            title: '회원가입 성공',
            text: '회원가입이 완료되었습니다.',
            confirmButtonText: '확인',
        }).then(() => {
            navigate('/login/seller');
        });
    };

    const errorSignup = () => {
        Swal.fire({
            icon: 'error',
            title: '회원가입 실패',
            text: '회원가입에 실패했습니다. 다시 시도해주세요.',
            confirmButtonText: '확인',
        }).then(() => {
            navigate('/');
        });
    };

    useBeforeunload((event) => event.preventDefault());

    return (
        <MainContainer>
            <MainBox height={'100%'} >
                <SignupDiv>
                    <SignupText>사업자 회원가입</SignupText>
                    <SignupInputDiv >
                        <InputField name='accountId' error={accountError} value={inputSellerData.accountId} onChange={handleAccountChange} label='아이디(6~20자 영문, 숫자만 입력)' helperText={accountMessage} />
                        <InputField name='password' error={passwordError} value={inputSellerData.password} onChange={handlePasswordChange} type='password' label='비밀번호(8~20자 영문, 숫자 조합)' helperText={passwordMessage} />
                        <InputField name='confirmPassword' error={confirmPasswordError} value={inputSellerData.confirmPassword} onChange={handlePasswordChange} type='password' label='비밀번호 확인' helperText={confirmPasswordMessage} />
                        <InputField name='name' error={nameError} value={inputSellerData.name} onChange={handleNameChange} label='이름' helperText={nameMessage} />
                        <InputField name='phoneNumber' error={phoneNumberError} value={inputSellerData.phoneNumber} onChange={handlePhoneNumberChange} label='휴대폰 번호(숫자만 입력)' helperText={phoneNumberMessage} />
                        <InputField name='email' error={emailError} value={inputSellerData.email} onChange={handleEmailChange} label='이메일' helperText={emailMessage} />
                        <InputField name='businessName' error={businessNameError} value={inputSellerData.businessName} onChange={handleBusinessNameChange} label='상호명' helperText={businessNameMessage} />
                        <InputField name='businessNumber' error={businessNumberError} value={inputSellerData.businessNumber} onChange={handleBusinessNumberChange} label='사업자 번호(숫자만 입력)' helperText={businessNumberMessage} />
                        <SignupButton onClick={validationCheck}>회원가입</SignupButton>
                    </SignupInputDiv>
                </SignupDiv>
            </MainBox>
        </MainContainer>
    );
};

export default SellerSignup;