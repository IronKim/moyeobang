import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useDebounce from './useDebounce';
import { checkAccountDup, checkEmailDup, validateAccount, validateEmail } from '../utils/validation';

export const useSignupDupChecks = (accountId, email) => {
    const debounceAccountId = useDebounce(accountId, 300);
    const debounceEmail = useDebounce(email, 300);

    const accountValidation = validateAccount(debounceAccountId || '');
    const emailValidation = validateEmail(debounceEmail || '');

    const accountDupQuery = useQuery(
        ['accountDupCheck', debounceAccountId],
        async () => (await checkAccountDup(debounceAccountId)).data.result,
        {
            enabled: Boolean(debounceAccountId) && accountValidation.isValid,
            retry: false,
            staleTime: 0,
        }
    );

    const emailDupQuery = useQuery(
        ['emailDupCheck', debounceEmail],
        async () => (await checkEmailDup(debounceEmail)).data.result,
        {
            enabled: Boolean(debounceEmail) && emailValidation.isValid,
            retry: false,
            staleTime: 0,
        }
    );

    const [accountError, setAccountError] = useState(false);
    const [accountMessage, setAccountMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');

    useEffect(() => {
        if (!debounceAccountId) {
            setAccountError(false);
            setAccountMessage('');
            return;
        }
        if (!accountValidation.isValid) {
            setAccountError(true);
            setAccountMessage(accountValidation.message);
            return;
        }
        if (accountDupQuery.isError) {
            setAccountError(true);
            setAccountMessage('중복 확인에 실패했습니다. 다시 시도해주세요.');
            return;
        }
        if (accountDupQuery.isSuccess) {
            setAccountError(accountDupQuery.data === true);
            setAccountMessage(accountDupQuery.data === true ? '이미 사용중인 아이디입니다.' : '');
        }
    }, [accountDupQuery.data, accountDupQuery.isError, accountDupQuery.isSuccess, accountValidation.isValid, accountValidation.message, debounceAccountId]);

    useEffect(() => {
        if (!debounceEmail) {
            setEmailError(false);
            setEmailMessage('');
            return;
        }
        if (!emailValidation.isValid) {
            setEmailError(true);
            setEmailMessage(emailValidation.message);
            return;
        }
        if (emailDupQuery.isError) {
            setEmailError(true);
            setEmailMessage('중복 확인에 실패했습니다. 다시 시도해주세요.');
            return;
        }
        if (emailDupQuery.isSuccess) {
            setEmailError(emailDupQuery.data === true);
            setEmailMessage(emailDupQuery.data === true ? '이미 사용중인 이메일입니다.' : '');
        }
    }, [debounceEmail, emailDupQuery.data, emailDupQuery.isError, emailDupQuery.isSuccess, emailValidation.isValid, emailValidation.message]);

    const validateForSubmit = async (rawAccountId, rawEmail) => {
        const accountResult = validateAccount(rawAccountId || '');
        setAccountError(!accountResult.isValid);
        setAccountMessage(accountResult.message);

        const emailResult = validateEmail(rawEmail || '');
        setEmailError(!emailResult.isValid);
        setEmailMessage(emailResult.message);

        if (!accountResult.isValid || !emailResult.isValid) {
            return false;
        }

        try {
            const [accountDupResponse, emailDupResponse] = await Promise.all([
                checkAccountDup(rawAccountId),
                checkEmailDup(rawEmail),
            ]);

            const isDuplicatedAccount = accountDupResponse?.data?.result === true;
            const isDuplicatedEmail = emailDupResponse?.data?.result === true;

            setAccountError(isDuplicatedAccount);
            setAccountMessage(isDuplicatedAccount ? '이미 사용중인 아이디입니다.' : '');

            setEmailError(isDuplicatedEmail);
            setEmailMessage(isDuplicatedEmail ? '이미 사용중인 이메일입니다.' : '');

            return !isDuplicatedAccount && !isDuplicatedEmail;
        } catch (error) {
            setAccountError(true);
            setAccountMessage('중복 확인에 실패했습니다. 다시 시도해주세요.');
            return false;
        }
    };

    return {
        accountError,
        accountMessage,
        emailError,
        emailMessage,
        validateForSubmit,
        accountValidation,
        emailValidation,
    };
};
