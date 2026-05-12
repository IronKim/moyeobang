import {ROLETYPE} from "../constants/ROLETYPE";
import {jwtDecode} from "jwt-decode";
import {userState} from "../atoms/userState";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {accountLogin} from "../api/AuthApiService";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {useMutation} from "react-query";

const PREFERRED_ROLE_TYPE_KEY = 'moyeobangPreferredRoleType';

export const useSetupUserDataByToken = () => {
    const setUserData = useSetRecoilState(userState)

    return () => {
        const token = localStorage.getItem('moyeobangToken');
        if (token) {
            const decodingInfoJson = jwtDecode(token);
            
            // 토큰 만료 여부 확인 (exp는 Unix timestamp, 초 단위)
            const currentTime = Date.now();
            const expirationTime = decodingInfoJson.exp * 1000; // 밀리초로 변환
            const isTokenExpired = expirationTime < currentTime;

            if (isTokenExpired) {
                // 토큰이 만료되었으면 로그아웃 처리
                localStorage.removeItem('moyeobangToken');
                localStorage.removeItem(PREFERRED_ROLE_TYPE_KEY);
                setUserData({
                    token: '',
                    accountId: '',
                    roles: [ROLETYPE.USER],
                    roleType: ROLETYPE.USER,
                });
                return;
            }

            const roles = Array.isArray(decodingInfoJson.roles) && decodingInfoJson.roles.length > 0
                ? decodingInfoJson.roles
                : [ROLETYPE.USER];
            const preferredRoleType = localStorage.getItem(PREFERRED_ROLE_TYPE_KEY);
            const effectiveRoleType = preferredRoleType && roles.includes(preferredRoleType)
                ? preferredRoleType
                : roles[0];

            if (preferredRoleType && !roles.includes(preferredRoleType)) {
                localStorage.removeItem(PREFERRED_ROLE_TYPE_KEY);
            }

            setUserData({
                token: token,
                accountId: decodingInfoJson.AccountId,
                roles: roles,
                roleType: effectiveRoleType,
                profileImage: decodingInfoJson.ProfileImage,
                profileName: decodingInfoJson.ProfileName,
            });
        }
    };
}

export const useLogin = () => {
    const navigate = useNavigate();
    const setupUserDataByToken = useSetupUserDataByToken();
    const loginMutation = useMutation(
        async (inputdata) => {
            const response = await accountLogin(inputdata);
            return response.data.result.token;
        },
        {
            onSuccess: (token) => {
                localStorage.setItem('moyeobangToken', token);
                setupUserDataByToken();
                navigate('/');
                Swal.fire({
                    icon: 'success',
                    title: '로그인 성공',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            onError: (error) => {
                const status = error?.response?.status;
                Swal.fire({
                    icon: 'error',
                    title: '로그인 실패',
                    text: status === 500 ?  '서버 오류입니다. 잠시 후 다시 시도해주세요.' : '아이디 또는 비밀번호를 확인해주세요.',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
        }
    );

    return {
        login: (inputdata, roleType) => {
            if (roleType === ROLETYPE.USER) {
                loginMutation.mutate(inputdata);
            }
        },
        isLoggingIn: loginMutation.isLoading,
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
        setUserData(prevState => {
            const isAuthenticated = Boolean(prevState.token);
            const availableRoles = Array.isArray(prevState.roles) ? prevState.roles : [];
            const canChangeRoleType = isAuthenticated
                ? availableRoles.includes(roleType)
                : true;

            if (isAuthenticated && canChangeRoleType) {
                localStorage.setItem(PREFERRED_ROLE_TYPE_KEY, roleType);
            }

            return {
                ...prevState,
                roleType: canChangeRoleType ? roleType : prevState.roleType,
            };
        });
    }
}