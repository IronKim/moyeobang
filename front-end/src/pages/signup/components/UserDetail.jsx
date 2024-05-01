import React, {useState} from 'react';
import styled from 'styled-components';
import InputField from "../../../components/InputField";
import {useBeforeunload} from "react-beforeunload";
import ProfileImage from "./ProfileImage";
import { Select } from 'antd';
import {PREFERENCE} from "../../../constants/PREFERENCE";
import SignupDiv from "./SignupDiv";
import SignupText from "./SignupText";
import SignupInputDiv from "./SignupInputDiv";
import TextareaField from "../../../components/TextareaField";

const GenderDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: 50px;
`

const GenderButton = styled.button`
    flex-basis: 50%;
    font-size: 20px;
    height: 60px;
    border: none;
    border-right: ${props => props.$isleft ? '1px solid lightgrey' : 'none'};
    background-color: ${props => props.$active ? '#96C2F6' : '#F4F1F1'};
    border-radius: ${props => props.$borderRadius};
    
    &:hover {
        cursor: pointer;
        border: 1px solid black;
    }
`

const BirthdayDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
    width: 90%;
    height: 80px;
    gap: 10px;
`

const BirthdaySelect = styled.select`
    border-radius: 15px;
    background-color: #F4F1F1;
    font-size: 20px;
    width: 90%;
    height: 60px;
    padding-left: 15px;
    border: none;
    outline: none;
    
    &:hover {
        cursor: pointer;
        border: 1px solid black;
    }
    
    &:focus {
        border: 1px solid black ;
        border-right: 1px solid black;
    }
    
`

const PreferenceSelect = styled(Select)`
    width: 90%;
    min-height: 60px;
    font-size: 20px;
    border-radius: 15px;;
    border: none;
    outline: none;
    
    .ant-select-selector {
        min-height: 60px;
        border-radius: 15px;
        background-color: #F4F1F1 !important;
    }

    .ant-select-selector:hover {
        border: 1px solid black; !important;
    }

    .ant-select-selector:focus {
        border: 1px solid black; !important;
    }
`


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

const UserDetail = ({ inputuserData, onInput, Signup}) => {

    const [isSignup, setIsSignup] = useState(false);

    const handleFileChange = (blobUrl) => {
        onInput({ target: { name: 'profileImage', value: blobUrl } }); // profileImage 업데이트
    };

    const handleNicknameChange = (e) => {
        onInput(e);
    }

    const handleProfileTextChange = (e) => {
        onInput(e);
    }

    const [gender, setGender] = useState('');

    const handleGenderChange = (selectedGender) => {
        if (gender === selectedGender) {
            setGender(null);
            onInput({ target: { name: 'gender', value: null } });
        } else {
            setGender(selectedGender);
            onInput({ target: { name: 'gender', value: selectedGender } });
        }
    };

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const currentYear = new Date().getFullYear();
    const years = Array.from({length: 87}, (_, i) => currentYear - i - 14);
    const months = Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0'));

    // 기본적으로 1일부터 31일까지 설정
    let days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    // 선택된 연도와 월에 따라 일의 범위를 동적으로 변경
    if (year && month) {
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        days = Array.from({ length: lastDayOfMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));
    }

    const handleBirthChange = (e) => {
        const { name, value } = e.target;
        if (name === 'year') {
            setYear(value);
            onInput(e);
        } else if (name === 'month') {
            setMonth(value);
            onInput(e);
        } else if (name === 'day') {
            onInput(e);
        }
    };

    const options = [
        { label: '공포', value: PREFERENCE.HORROR },
        { label: '로맨스', value: PREFERENCE.ROMANCE },
        { label: '액션', value: PREFERENCE.ACTION },
        { label: '코미디', value: PREFERENCE.COMEDY },
        { label: '드라마', value: PREFERENCE.DRAMA },
        { label: '판타지', value: PREFERENCE.FANTASY },
        { label: '스릴러', value: PREFERENCE.THRILLER },
        { label: '미스터리', value: PREFERENCE.MYSTERY },
        { label: '범죄', value: PREFERENCE.CRIME },
        { label: '어드벤처', value: PREFERENCE.ADVENTURE },
        { label: 'SF', value: PREFERENCE.SF },
        { label: '기타', value: PREFERENCE.ETC }
    ];

    const handleSignup = () => {
        setIsSignup(true);
        Signup();
    }


    // 창을 닫으려고 할 때 경고창을 띄우는 이벤트
    useBeforeunload((event) => event.preventDefault());

    return (
        <SignupDiv>
            <SignupText>회원가입(선택)</SignupText>
            <SignupInputDiv gap={'20px'} height={'100%'}>
                <ProfileImage height={200} width={200} id='imageInput' onChange={handleFileChange} />
                프로필 사진
                <InputField name='nickname' value={inputuserData.nickname} onChange={handleNicknameChange} label='닉네임'/>
                <TextareaField name='profileText' value={inputuserData.profileText} onChange={handleProfileTextChange} label={'프로필 소개글'} placeholder={'자기소개를 입력해주세요'} maxCount={100}/>
                <span style={{fontSize: '28px'}}>성별</span>
                <GenderDiv>
                    <GenderButton
                        $active={gender === 'M'}
                        $borderRadius='15px 0px 0px 15px'
                        onClick={() => handleGenderChange('M')}
                        $isleft={true}
                    >
                        남자
                    </GenderButton>
                    <GenderButton
                        $active={gender === 'F'}
                        $borderRadius='0px 15px 15px 0px'
                        onClick={() => handleGenderChange('F')}
                    >
                        여자
                    </GenderButton>
                </GenderDiv>
                <span style={{fontSize: '28px', marginBottom: '-10px'}}>생년월일</span>
                <BirthdayDiv>
                    <BirthdaySelect name='year' onChange={handleBirthChange}>
                        <option value=''>년</option>
                        {years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </BirthdaySelect>
                    <BirthdaySelect name='month' onChange={handleBirthChange}>
                        <option value=''>월</option>
                        {months.map((month) => <option key={month} value={month}>{month}</option>)}
                    </BirthdaySelect>
                    <BirthdaySelect name='day' onChange={handleBirthChange}>
                        <option value=''>일</option>
                        {days.map((day) => <option key={day} value={day}>{day}</option>)}
                    </BirthdaySelect>
                </BirthdayDiv>
                <PreferenceSelect mode='multiple' placeholder='선호하는 테마를 선택해주세요.'
                        onChange={(value) => onInput({ target: { name: 'preferenceTypes', value: value }})} options={options} allowClear variant={"borderless"} />
                <SignupButton disabled={isSignup} onClick={handleSignup}>회원가입</SignupButton>
            </SignupInputDiv>
        </SignupDiv>
    );
};

export default UserDetail;