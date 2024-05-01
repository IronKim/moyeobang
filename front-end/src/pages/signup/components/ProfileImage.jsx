import styled from 'styled-components';
import {useRef, useState} from "react";
import basicProfileImg from '../../../assets/images/BasicProfileImg.png';
import Swal from 'sweetalert2';

const ProfileImageContainer = styled.div`
    :hover {
        cursor: pointer;
        opacity: 0.6;
    }
`;

const Image = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    object-fit: cover;
    border-radius: 50%;
`;

const ProfileImage = ({ id, src, onChange, width, height }) => {
    const inputRef = useRef(null);

    const [profileImage, setProfileImage] = useState(basicProfileImg);
    const [url, setUrl] = useState('');

    const handleClick = () => {

        Swal.fire({
            title: '프로필 선택',
            text: '원하는 프로필을 선택하세요.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '프로필 설정',
            cancelButtonText: '기본 프로필',
        }).then((result) => {
            if (result.isConfirmed) {
                // 프로필 설정 선택
                inputRef.current.click();
                // 팝업창 닫기
                Swal.close();

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // 기본 프로필 선택
                setProfileImage(basicProfileImg);
                onChange(null);
            }
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (url) {
                URL.revokeObjectURL(url);
            }
            const blobUrl = URL.createObjectURL(file);
            setUrl(blobUrl);
            setProfileImage(blobUrl);
            e.target.value = null;
            onChange(blobUrl);
        }
    };

    return (
        <ProfileImageContainer onClick={handleClick}>
            <Image style={{width: width, height: height}} id={id} src={profileImage} alt="Profile" />
            <input onChange={handleFileChange} ref={inputRef} type="file" style={{ display: 'none' }}  accept="image/*" />
        </ProfileImageContainer>
    );
};

export default ProfileImage;