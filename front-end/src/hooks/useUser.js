import {ROLETYPE} from "../constants/ROLETYPE";
import {jwtDecode} from "jwt-decode";
import {userState} from "../atoms/userState";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {accountIdCheck, sellerLogin, userLogin} from "../api/AuthApiService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {useState} from "react";

export const useSetupUserDataByToken = () => {
    const setUserData = useSetRecoilState(userState)

    return () => {
        const token = localStorage.getItem('moyeobangToken');
        if (token) {
            let decodingInfoJson = jwtDecode(token);

            if (decodingInfoJson.RoleType === ROLETYPE.USER) {
                setUserData({
                    token: token,
                    accountId: decodingInfoJson.AccountId,
                    roleType: decodingInfoJson.RoleType,
                    profileImage: decodingInfoJson.ProfileImage,
                    profileName: decodingInfoJson.ProfileName,
                });
            } else if (decodingInfoJson.RoleType === ROLETYPE.SELLER) {
                setUserData({
                    token: token,
                    accountId: decodingInfoJson.AccountId,
                    roleType: decodingInfoJson.RoleType,
                    name: decodingInfoJson.Name,
                    businessName: decodingInfoJson.BusinessName,
                    authStatus: decodingInfoJson.AuthStatus
                });
            }
        }
    };
}

export const useLogin = () => {
    const navigate = useNavigate();
    const setupUserDataByToken = useSetupUserDataByToken();
    const successLogin = (token) => {
        localStorage.setItem('moyeobangToken', token);
        setupUserDataByToken();
        navigate('/');
        Swal.fire({
            icon: 'success',
            title: '로그인 성공',
            showConfirmButton: false,
            timer: 1500
        });
    }

    const failLogin = (status) => {
        Swal.fire({
            icon: 'error',
            title: '로그인 실패',
            text: status === 500 ?  '서버 오류입니다. 잠시 후 다시 시도해주세요.' : '아이디 또는 비밀번호를 확인해주세요.',
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (inputdata, roleType) => {
        if(roleType === ROLETYPE.USER) {
            userLogin(inputdata)
                .then(response => {
                    successLogin(response.data.result.token);
                }).catch(error => {
                    failLogin(error.response.status);
            });
        } else if(roleType === ROLETYPE.SELLER) {
            sellerLogin(inputdata)
                .then(response => {
                    successLogin(response.data.result.token);
                }).catch(error => {
                    failLogin(error.response.status);
            })
        }
    };
}

export const useLogout = () => {
    const resetUserData = useResetRecoilState(userState);
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem('moyeobangToken');
        resetUserData();
        navigate('/');

        Swal.fire({
            icon: 'success',
            title: '로그아웃 되었습니다.',
            timer: 1000,
            allowOutsideClick: false,
            showConfirmButton: false
        });
    }
}

export const useChangeRoleType = () => {
    const setUserData = useSetRecoilState(userState);

    return (roleType) => {
        setUserData(prevState => ({
            ...prevState,
            roleType: roleType
        }));
    }
}

export const useCheckAccountValidation = (dupCheck = true) => {
    const [accountError, setAccountError] = useState(false);
    const [accountMessage, setAccountMessage] = useState('');
    const accountValidator = (account, realtime = false) => {
        if(realtime) {
            setAccountError(false);
            setAccountMessage('');
        } else if (!/^[a-zA-Z0-9]*$/.test(account)) {
            setAccountError(true);
            setAccountMessage('아이디는 영문, 숫자만 입력 가능합니다.');
        } else if(account.length < 6) {
            setAccountError(true);
            setAccountMessage('아이디는 6자리 이상이어야 합니다.');
        } else if(account.length > 20) {
            setAccountError(true);
            setAccountMessage('아이디는 20자 이하로 입력해주세요.');
        }

        if(dupCheck) {
            accountIdCheck(account)
                .then(response => {
                    if(response.data.result === true){
                        setAccountError(true);
                        setAccountMessage('이미 사용중인 아이디입니다.');
                    }
                }).catch(error => {
                    console.log(error);
            });
        }
    }

    return { accountValidator, accountError, accountMessage };
}

export const useCheckPasswordValidation = () => {
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    const passwordValidator = (password, confirmPassword = '', realtime = false) => {
        if(realtime) {
            setPasswordError(false);
            setPasswordMessage('');
            setConfirmPasswordError(false);
            setConfirmPasswordMessage('');
        } else if(password.length < 8) {
            setPasswordError(true);
            setPasswordMessage('비밀번호는 8자리 이상이어야 합니다.');
        } else if(password.length > 20) {
            setPasswordError(true);
            setPasswordMessage('비밀번호는 20자 이하로 입력해주세요.');
        } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
            setPasswordError(true);
            setPasswordMessage('비밀번호는 영문, 숫자 조합이어야 합니다.');
        } else if(confirmPassword && password !== confirmPassword) {
            setConfirmPasswordError(true);
            setConfirmPasswordMessage('비밀번호 확인이 일치하지 않습니다.');
        }
    }

    return { passwordValidator, passwordError, confirmPasswordError, passwordMessage, confirmPasswordMessage };
}

export const useCheckNameValidation = () => {
    const [nameError, setNameError] = useState(false);
    const [nameMessage, setNameMessage] = useState('');

    const nameValidator = (name, realtime = false) => {
        if(realtime) {
            setNameError(false);
            setNameMessage('');
        } else if(name.length < 2) {
            setNameError(true);
            setNameMessage('이름은 2자리 이상이어야 합니다.');
        } else if(name.length > 20) {
            setNameError(true);
            setNameMessage('이름은 20자 이하로 입력해주세요.');
        } else if (!/^[가-힣ㄱ-ㅎa-zA-Z]*$/.test(name)) {
            setNameError(true);
            setNameMessage('이름은 한글, 영어만 입력 가능합니다.');
        }
    }

    return { nameValidator, nameError, nameMessage };
}

export const useCheckPhoneNumberValidation = () => {
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');

    const phoneNumberValidator = (phoneNumber, realtime = false) => {
        if(realtime) {
            setPhoneNumberError(false);
            setPhoneNumberMessage('');
        } else if(phoneNumber.length === 0) {
            setPhoneNumberError(true);
            setPhoneNumberMessage('휴대폰 번호를 입력해주세요.');
        } else if(phoneNumber.length > 11) {
            setPhoneNumberError(true);
            setPhoneNumberMessage('휴대폰 번호는 11자리 이하로 입력해주세요.');
        } else if (!/^[0-9]*$/.test(phoneNumber)) {
            setPhoneNumberError(true);
            setPhoneNumberMessage('휴대폰 번호는 숫자만 입력 가능합니다.');
        } else if(!/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(phoneNumber)) {
            setPhoneNumberError(true);
            setPhoneNumberMessage('올바르지 않은 휴대폰 번호 형식입니다.');
        }
    }

    return { phoneNumberValidator, phoneNumberError, phoneNumberMessage };
}

export const useCheckEmailValidation = () => {
    const [emailError, setEmailError] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');

    const emailValidator = (email, realtime = false) => {
        if(realtime) {
            setEmailError(false);
            setEmailMessage('');
        } else if(email.length === 0) {
            setEmailError(true);
            setEmailMessage('이메일을 입력해주세요.');
        } else if(email.length > 50) {
            setEmailError(true);
            setEmailMessage('이메일은 50자 이하로 입력해주세요.');
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setEmailError(true);
            setEmailMessage('올바르지 않은 이메일 형식입니다.');
        }
    }

    return { emailValidator, emailError, emailMessage };
}