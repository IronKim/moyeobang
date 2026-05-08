import React, {useState} from 'react';
import AccountEssential from "./components/AccountEssential";
import AccountDetail from "./components/AccountDetail";
import {accountJoin} from "../../api/AuthApiService";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";

const Signup = () => {
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const nextPage = () => {
        setPage(page+1);
    }

    const [inputAccountData, setInputAccountData] = useState({
        accountId: '',
        password: '',
        confirmPassword: '',
        name: '',
        phoneNumber: '',
        email: '',
        gender: null,
        year: '',
        month: '',
        day: '',
        profileName: '',
        profileImage: '',
        profileText: '',
        preferenceTypes: [],
    });

    const onInput = (e) => {
        const { name, value } = e.target;
        setInputAccountData((prevInputAccountData) => ({
            ...prevInputAccountData,
            [name]: value,
        }));
    };

    const afterSignup = () => {
        Swal.fire({
            icon: 'success',
            title: '회원가입 성공',
            text: '회원가입이 완료되었습니다.',
            confirmButtonText: '확인',
        }).then(() => {
            navigate('/login');
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

    const Signup = () => {
        const accountData = {
            accountId: inputAccountData.accountId,
            password: inputAccountData.password,
            name: inputAccountData.name,
            phoneNumber: inputAccountData.phoneNumber,
            email: inputAccountData.email,
            gender: inputAccountData.gender,
            birthday: (inputAccountData.year && inputAccountData.month && inputAccountData.day) ? `${inputAccountData.year}-${inputAccountData.month}-${inputAccountData.day}` : null,
            profileName: inputAccountData.profileName,
            profileImage: inputAccountData.profileImage,
            profileText: inputAccountData.profileText,
            preferenceGenres: inputAccountData.preferenceTypes,
        };

        const formData = new FormData();
        Object.entries(accountData).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                return;
            }

            if (Array.isArray(value)) {
                value.forEach((item) => formData.append(key, item));
                return;
            }

            formData.append(key, value);
        });

        accountJoin(formData)
                .then(() => {
                    afterSignup();
                })
                .catch(() => {
                    errorSignup();
                });
    };

    return (
        <MainContainer>
            <MainBox height={'100%'}>
                {
                    page === 0 && <AccountEssential onInput={onInput} inputAccountData={inputAccountData} nextPage={nextPage} />
                }
                {
                    page === 1 && <AccountDetail Signup={Signup} inputAccountData={inputAccountData} onInput={onInput} />
                }
             </MainBox>
        </MainContainer>
    );
};

export default Signup;