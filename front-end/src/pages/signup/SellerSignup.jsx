import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";
import useDebounce from "../../hooks/useDebounce";
import {accountIdCheck, sellerJoin} from "../../api/AuthApiService";
import SignupText from "./components/SignupText";
import SignupInputDiv from "./components/SignupInputDiv";
import InputField from "../../components/InputField";
import styled from "styled-components";
import SignupDiv from "./components/SignupDiv";
import {useBeforeunload} from "react-beforeunload";

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

    const [accountIdError, setAccountIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [businessNameError, setBusinessNameError] = useState(false);
    const [businessNumberError, setBusinessNumberError] = useState(false);
    const [helperText, setHelperText] = useState({
        accountId: '',
        password: '',
        confirmPassword: '',
        name: '',
        phoneNumber: '',
        email: '',
        businessName: '',
        businessNumber: '',
    });

    const debounceQuery = useDebounce(inputSellerData.accountId, 300);
    const [isSignupButtonClicked, setIsSignupButtonClicked] = useState(false);

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

    const handleBusinessNameChange = (e) => {
        setBusinessNameError(false);
        setHelperText(prevState => ({
            ...prevState,
            businessName: ''
        }));
        const { value } = e.target;

        // 2~20자
        if (value.length > 20) {
            return;
        }

        onInput(e);
    }

    const handleBusinessNumberChange = (e) => {
        setBusinessNumberError(false);
        setHelperText(prevState => ({
            ...prevState,
            businessNumber: ''
        }));
        const { value } = e.target;

        // 10자리 넘어가면 입력이 안되도록 하는 조건문
        if (value.length > 10) {
            return;
        }

        // 숫자만 입력되도록 하는 조건문
        if (!/^[0-9]*$/.test(value)) {
            setHelperText(prevState => ({
                ...prevState,
                businessNumber: '숫자만 입력 가능합니다.'
            }));
            return;
        }

        onInput(e);
    }

    const validationCheck = async () => {
        if(!isSignupButtonClicked){
            setIsSignupButtonClicked(true);

            let isValidation = true;

            //acountId가 6자리 이상인지 확인
            if (inputSellerData.accountId.length < 6) {
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
            if (inputSellerData.password.length < 8) {
                setPasswordError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    password: '비밀번호는 8자리 이상이어야 합니다.'
                }));
                isValidation = false;
            } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(inputSellerData.password)) {
                setPasswordError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    password: '비밀번호는 영문, 숫자 조합이어야 합니다.'
                }));
                isValidation = false;
            } else if(inputSellerData.password !== inputSellerData.confirmPassword){
                setConfirmPasswordError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    confirmPassword: '비밀번호 확인이 일치하지 않습니다.'
                }));
                isValidation = false;
            }

            //name이 2자리 이상인지 확인 && name이 한글, 영어로만 이루어졌는지 확인
            if (inputSellerData.name.length < 2 || !/^[가-힣a-zA-Z]*$/.test(inputSellerData.name)) {
                setNameError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    name: '올바르지않은 이름 형식입니다.'
                }));
                isValidation = false;
            }

            //phoneNumber이 ^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$") 형식인지 확인
            if (!/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(inputSellerData.phoneNumber)) {
                setPhoneNumberError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    phoneNumber: '올바르지 않은 휴대폰 번호 형식입니다.'
                }));
                isValidation = false;
            }

            //email이 이메일 형식인지 확인
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputSellerData.email)) {
                setEmailError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    email: '올바르지 않은 이메일 형식입니다.'
                }));
                isValidation = false;
            }

            //businessName이 2자리 이상인지 확인
            if (inputSellerData.businessName.length < 2) {
                setBusinessNameError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    businessName: '상호명은 2자리 이상이어야 합니다.'
                }));
                isValidation = false;
            }

            //businessNumber가 10자리인지 확인
            if (inputSellerData.businessNumber.length !== 10) {
                setBusinessNumberError(true);
                setHelperText(prevState => ({
                    ...prevState,
                    businessNumber: '사업자 번호는 10자리여야 합니다.'
                }));
                isValidation = false;
            }

            if(isValidation){
                signup();
            }

            setTimeout(() => {
                setIsSignupButtonClicked(false);
            }, 1000);

        }
    }

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
            .then((response) => {
                afterSignup();
            })
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
    }

    const errorSignup = () => {
        Swal.fire({
            icon: 'error',
            title: '회원가입 실패',
            text: '회원가입에 실패했습니다. 다시 시도해주세요.',
            confirmButtonText: '확인',
        }).then(() => {
            navigate('/');
        });
    }

    // 창을 닫으려고 할 때 경고창을 띄우는 이벤트
    useBeforeunload((event) => event.preventDefault());

    return (
        <MainContainer>
            <MainBox height={'100%'} >
                <SignupDiv>
                    <SignupText>사업자 회원가입</SignupText>
                    <SignupInputDiv >
                        <InputField name='accountId' error={accountIdError} value={inputSellerData.accountId} onChange={handleAccountChange} label='아이디(6~20자 영문, 숫자만 입력)' helperText={helperText.accountId} />
                        <InputField name='password' error={passwordError} value={inputSellerData.password} onChange={handlePasswordChange} type='password' label='비밀번호(8~20자 영문, 숫자 조합)' helperText={helperText.password} />
                        <InputField name='confirmPassword' error={confirmPasswordError} onChange={handlePasswordChange} type='password' label='비밀번호 확인' helperText={helperText.confirmPassword} />
                        <InputField name='name' error={nameError} value={inputSellerData.name} onChange={handleNameChange} label='이름' helperText={helperText.name} />
                        <InputField name='phoneNumber' error={phoneNumberError} value={inputSellerData.phoneNumber} onChange={handlePhoneNumberChange} label='휴대폰 번호(숫자만 입력)' helperText={helperText.phoneNumber} />
                        <InputField name='email' error={emailError} value={inputSellerData.email} onChange={handleEmailChange} label='이메일' helperText={helperText.email} />
                        <InputField name='businessName' error={businessNameError} value={inputSellerData.businessName} onChange={handleBusinessNameChange} label='상호명' helperText={helperText.businessName} />
                        <InputField name='businessNumber' error={businessNumberError} value={inputSellerData.businessNumber} onChange={handleBusinessNumberChange} label='사업자 번호(숫자만 입력)' helperText={helperText.businessNumber} />
                        <SignupButton onClick={validationCheck}>회원가입</SignupButton>
                    </SignupInputDiv>
                </SignupDiv>
            </MainBox>
        </MainContainer>
    );
};

export default SellerSignup;