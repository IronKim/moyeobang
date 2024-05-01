import React, {useState} from 'react';
import UserEssential from "./components/UserEssential";
import UserDetail from "./components/UserDetail";
import {filesUpload} from "../../api/StorageApiService";
import {userJoin} from "../../api/AuthApiService";
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

    const [inputuserData, setInputUserData] = useState({
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
        nickname: '',
        profileImage: '',
        profileText: '',
        preferenceTypes: [],
    });

    const onInput = (e) => {
        const { name, value } = e.target;
        setInputUserData((prevInputUserData) => ({
            ...prevInputUserData,
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
            navigate('/login/user');
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
        // 사용자 데이터 설정
        let userData = {
            accountId: inputuserData.accountId,
            password: inputuserData.password,
            name: inputuserData.name,
            phoneNumber: inputuserData.phoneNumber,
            email: inputuserData.email,
            gender: inputuserData.gender,
            birthday: (inputuserData.year && inputuserData.month && inputuserData.day) ? `${inputuserData.year}-${inputuserData.month}-${inputuserData.day}` : null,
            nickname: inputuserData.nickname,
            profileImage: null, // 프로필 이미지는 파일 업로드 후 URL을 받아서 설정
            profileText: inputuserData.profileText,
            preferenceTypes: inputuserData.preferenceTypes,
        };

        // 파일 전송을 위한 FormData 객체 생성
        const formData = new FormData();

        // 프로필 이미지가 있는 경우에만 처리
        if (inputuserData.profileImage) {
            // fetch와 filesUpload를 하나의 프로미스로 처리
            Promise.resolve()
                // 프로필 이미지 업로드
                .then(() => fetch(inputuserData.profileImage))
                .then((response) => response.blob())
                .then((blob) => {
                    const file = new File([blob], 'image.png', { type: 'image/png' });
                    formData.append('files', file);
                    return filesUpload(formData);
                })
                .then((res) => {
                    // 프로필 이미지 업로드 성공 시
                    userData = {
                        ...userData,
                        profileImage: res.data.result[0],
                    }
                })
                // 사용자 가입
                .then(() => {
                    userJoin(userData)
                        .then((response) => {
                            afterSignup();
                        })
                        .catch((error) => {
                            console.log(error);
                            errorSignup();
                        });
                })
                .catch((error) => {
                    console.log(error);
                    errorSignup();
                });
        } else {
            // 프로필 이미지가 없는 경우에는 사용자 가입만 처리
            userJoin(userData)
                .then((response) => {
                    afterSignup();
                })
                .catch((error) => {
                    console.log(error);
                    errorSignup();
                });
        }
    };

    return (
        <MainContainer>
            <MainBox height={'100%'}>
                {
                    page === 0 && <UserEssential onInput={onInput} inputuserData={inputuserData} nextPage={nextPage} />
                }
                {
                    page === 1 && <UserDetail Signup={Signup} inputuserData={inputuserData} onInput={onInput} />
                }
             </MainBox>
        </MainContainer>
    );
};

export default Signup;