import { accountIdCheck } from '../api/AuthApiService';

export const validateAccount = (account) => {
    if (!/^[a-zA-Z0-9]*$/.test(account)) return { isValid: false, message: '아이디는 영문, 숫자만 입력 가능합니다.' };
    if (account.length < 6) return { isValid: false, message: '아이디는 6자리 이상이어야 합니다.' };
    if (account.length > 20) return { isValid: false, message: '아이디는 20자 이하로 입력해주세요.' };
    return { isValid: true, message: '' };
};

export const checkAccountDup = (account) => accountIdCheck(account);

export const validatePassword = (password, confirmPassword = '') => {
    if (password.length < 8) return { isValid: false, field: 'password', message: '비밀번호는 8자리 이상이어야 합니다.' };
    if (password.length > 20) return { isValid: false, field: 'password', message: '비밀번호는 20자 이하로 입력해주세요.' };
    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) return { isValid: false, field: 'password', message: '비밀번호는 영문, 숫자 조합이어야 합니다.' };
    if (password !== confirmPassword) return { isValid: false, field: 'confirmPassword', message: '비밀번호 확인이 일치하지 않습니다.' };
    return { isValid: true, field: null, message: '' };
};

export const validateName = (name) => {
    if (name.length < 2) return { isValid: false, message: '이름은 2자리 이상이어야 합니다.' };
    if (name.length > 20) return { isValid: false, message: '이름은 20자 이하로 입력해주세요.' };
    if (!/^[가-힣ㄱ-ㅎa-zA-Z]*$/.test(name)) return { isValid: false, message: '이름은 한글, 영어만 입력 가능합니다.' };
    return { isValid: true, message: '' };
};

export const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length === 0) return { isValid: false, message: '휴대폰 번호를 입력해주세요.' };
    if (phoneNumber.length > 11) return { isValid: false, message: '휴대폰 번호는 11자리 이하로 입력해주세요.' };
    if (!/^[0-9]*$/.test(phoneNumber)) return { isValid: false, message: '휴대폰 번호는 숫자만 입력 가능합니다.' };
    if (!/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/.test(phoneNumber)) return { isValid: false, message: '올바르지 않은 휴대폰 번호 형식입니다.' };
    return { isValid: true, message: '' };
};

export const validateEmail = (email) => {
    if (email.length === 0) return { isValid: false, message: '이메일을 입력해주세요.' };
    if (email.length > 50) return { isValid: false, message: '이메일은 50자 이하로 입력해주세요.' };
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return { isValid: false, message: '올바르지 않은 이메일 형식입니다.' };
    return { isValid: true, message: '' };
};