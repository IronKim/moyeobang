import {ROLETYPE} from "../constants/ROLETYPE";
import {jwtDecode} from "jwt-decode";
import {userState} from "../atoms/userState";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {sellerLogin, userLogin} from "../api/AuthApiService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

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