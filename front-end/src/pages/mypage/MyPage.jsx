import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../atoms/userState';
import { ROLETYPE } from '../../constants/ROLETYPE';
import MainContainer from '../../components/MainContainer';
import MainBox from '../../components/MainBox';
import basicProfileImg from '../../assets/images/BasicProfileImg.png';
import ReservationTab from './tabs/ReservationTab';
import ProfileSettingsTab from './tabs/ProfileSettingsTab';
import ActivityTab from './tabs/ActivityTab';
import SellerRegistrationTab from './tabs/SellerRegistrationTab';

const PageInner = styled.div`
    width: 92%;
    margin: 0 auto;
    padding: 40px 0 56px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 1200px) {
        width: 95%;
        padding: 24px 0 32px 0;
    }
`;

const ProfileSection = styled.section`
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 20px;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

const Panel = styled.div`
    border: 1px solid #e7edf3;
    border-radius: 18px;
    background-color: #ffffff;
    padding: 20px;
`;

const Avatar = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 14px auto;
`;

const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Nickname = styled.h2`
    font-size: 24px;
    font-weight: 700;
`;

const ProfileNameRow = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 8px;
    margin-bottom: 6px;
    width: 100%;

    @media (max-width: 1200px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
    }
`;

const AccountId = styled.p`
    color: #6f7a86;
    font-size: 14px;
`;

const IntroText = styled.p`
    color: #5f6a75;
    font-size: 14px;
    line-height: 1.5;
    word-break: keep-all;
    text-align: center;
`;

const HeroTitle = styled.h1`
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const AlertList = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const AlertBanner = styled.div`
    border: 1px solid #d9eafb;
    background-color: #f4faff;
    border-radius: 12px;
    padding: 12px 14px;
`;

const AlertTitle = styled.p`
    color: #1d4f78;
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 6px;
`;

const AlertText = styled.p`
    color: #48535e;
    font-size: 14px;
    line-height: 1.5;
`;

const StatRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 18px;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

const StatCard = styled.div`
    border-radius: 12px;
    background-color: #f6fbff;
    padding: 14px;
`;

const StatLabel = styled.p`
    color: #74808c;
    font-size: 13px;
    margin-bottom: 8px;
`;

const StatValue = styled.p`
    font-size: 24px;
    font-weight: 700;
`;

const TabSection = styled.section`
    border: 1px solid #e7edf3;
    border-radius: 18px;
    background-color: #ffffff;
    overflow: hidden;
`;

const TabBar = styled.div`
    display: flex;
    border-bottom: 1px solid #e7edf3;
    background-color: #f7fbff;

    @media (max-width: 1200px) {
        overflow-x: auto;
    }
`;

const TabButton = styled.button`
    border: none;
    background: ${props => (props.$active ? '#ffffff' : 'transparent')};
    color: ${props => (props.$active ? '#17324a' : '#668095')};
    font-size: 16px;
    font-weight: ${props => (props.$active ? 700 : 500)};
    padding: 16px 22px;
    border-bottom: ${props => (props.$active ? '2px solid #96c2f6' : '2px solid transparent')};
    white-space: nowrap;

    &:hover {
        cursor: pointer;
        color: #17324a;
    }
`;

const TabActions = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-left: 1px solid #e7edf3;

    @media (max-width: 1200px) {
        margin-left: 0;
        border-left: none;
        padding: 8px;
    }
`;

const SellerBadge = styled.span`
    font-size: 11px;
    font-weight: 700;
    color: #0e4c78;
    background-color: #dff1ff;
    border-radius: 999px;
    padding: 4px 8px;
`;

const SellerActionButton = styled.button`
    border: 1px solid ${props => (props.$active ? '#0e74b7' : '#b9d6ea')};
    background: ${props => (props.$active ? '#0e74b7' : '#ffffff')};
    color: ${props => (props.$active ? '#ffffff' : '#215174')};
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    padding: 8px 14px;
    white-space: nowrap;

    &:hover {
        cursor: pointer;
        border-color: #0e74b7;
        color: ${props => (props.$active ? '#ffffff' : '#0e74b7')};
    }
`;

const TabPanel = styled.div`
    padding: 20px;
`;

const MyPage = () => {
    const navigate = useNavigate();
    const userData = useRecoilValue(userState);
    const setUserData = useSetRecoilState(userState);
    const [activeTab, setActiveTab] = useState('reservation');
    const isSellerAuthorized =
        userData.roleType === ROLETYPE.OWNER || userData.roles?.includes(ROLETYPE.OWNER);

    const handleSellerActionClick = () => {
        if (isSellerAuthorized) {
            localStorage.setItem('moyeobangPreferredRoleType', ROLETYPE.OWNER);
            setUserData((prev) => ({
                ...prev,
                roleType: ROLETYPE.OWNER,
            }));
            navigate('/');
        } else {
            setActiveTab('seller');
        }
    };

    return (
        <MainContainer>
            <MainBox height={'100%'}>
                <PageInner>
                    <ProfileSection>
                        <Panel>
                            <Avatar>
                                <AvatarImg src={userData.profileImage || basicProfileImg} alt={'profile-image'} />
                            </Avatar>
                            <ProfileNameRow>
                                <Nickname>{userData.profileName || '사용자'}</Nickname>
                                <AccountId>@{userData.accountId || 'guest'}</AccountId>
                            </ProfileNameRow>
                            <IntroText>{userData.profileText || '소개글을 아직 작성하지 않았습니다.'}</IntroText>
                        </Panel>

                        <Panel>
                            <HeroTitle>마이페이지</HeroTitle>
                            <StatRow>
                                <StatCard>
                                    <StatLabel>예정 예약</StatLabel>
                                    <StatValue>0</StatValue>
                                </StatCard>
                                <StatCard>
                                    <StatLabel>지난 방문</StatLabel>
                                    <StatValue>0</StatValue>
                                </StatCard>
                                <StatCard>
                                    <StatLabel>찜한 테마</StatLabel>
                                    <StatValue>0</StatValue>
                                </StatCard>
                            </StatRow>

                            <AlertList>
                                <AlertBanner>
                                    <AlertTitle>이번 주 알림</AlertTitle>
                                    <AlertText>예정된 예약이 없어요. 새 모임을 찾아보고 일정을 채워보세요.</AlertText>
                                </AlertBanner>
                                <AlertBanner>
                                    <AlertTitle>프로필 안내</AlertTitle>
                                    <AlertText>소개글을 자세히 작성하면 모임 매칭에서 더 잘 보여요.</AlertText>
                                </AlertBanner>
                            </AlertList>
                        </Panel>
                    </ProfileSection>

                    <TabSection>
                        <TabBar>
                            <TabButton
                                type={'button'}
                                $active={activeTab === 'reservation'}
                                onClick={() => setActiveTab('reservation')}
                            >
                                예약 내역
                            </TabButton>
                            <TabButton
                                type={'button'}
                                $active={activeTab === 'profile'}
                                onClick={() => setActiveTab('profile')}
                            >
                                개인정보 / 설정
                            </TabButton>
                            <TabButton
                                type={'button'}
                                $active={activeTab === 'activity'}
                                onClick={() => setActiveTab('activity')}
                            >
                                활동 기록
                            </TabButton>
                            <TabActions>
                                <SellerBadge>사장님 전용</SellerBadge>
                                <SellerActionButton
                                    type={'button'}
                                    $active={activeTab === 'seller'}
                                    onClick={handleSellerActionClick}
                                >
                                    {isSellerAuthorized ? '업체 관리' : '업체 등록'}
                                </SellerActionButton>
                            </TabActions>
                        </TabBar>

                        <TabPanel>
                            {activeTab === 'reservation' && <ReservationTab />}
                            {activeTab === 'profile' && <ProfileSettingsTab />}
                            {activeTab === 'activity' && <ActivityTab />}
                            {activeTab === 'seller' && <SellerRegistrationTab />}
                        </TabPanel>
                    </TabSection>
                </PageInner>
            </MainBox>
        </MainContainer>
    );
};

export default MyPage;
