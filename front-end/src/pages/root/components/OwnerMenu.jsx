import React, {useState} from 'react';
import styled from "styled-components";
import {RiArrowDownSLine, RiArrowUpSLine} from "react-icons/ri";
import {IoMdHome} from "react-icons/io";
import {OWNERMENU} from "../../../constants/OWNERMENU";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import Swal from "sweetalert2";
import {ROLETYPE} from "../../../constants/ROLETYPE";
import {userState} from "../../../atoms/userState";
import {useLogout} from "../../../hooks/useUser";

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 280px;
    height: auto;
    align-self: stretch;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    border-radius: 25px;
    background-color: #202166;
    color: white;
    
    @media (max-width: 1200px) {
        display: none;
    }
`

const BottomActions = styled.div`
    width: 90%;
    margin-top: auto;
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const SideActionButton = styled.button`
    border: 1px solid #8f9cff;
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    height: 40px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;

    &:hover {
        cursor: pointer;
        background: rgba(255, 255, 255, 0.18);
    }
`;

const SideLogoutButton = styled(SideActionButton)`
    border-color: #ffb6b6;

    &:hover {
        background: rgba(255, 104, 104, 0.2);
    }
`;

const MainMenuContainer = styled.div`
    margin: 10px 0 10px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;

const MainMenuLabel = styled.span`
    font-weight: 700;
    font-size: 22px;
    line-height: 1.35;
    letter-spacing: -0.01em;
    color: ${({ $isActive }) => ($isActive ? '#F3F4FF' : '#FFFFFF')};
    transition: color 0.2s ease;
`;

const ArrowIconWrap = styled.span`
    display: inline-flex;
    align-items: center;
    color: ${({ $isActive }) => ($isActive ? '#D7DBFF' : '#FFFFFF')};
    transition: color 0.2s ease;
`;

const SubMenuContainer = styled.div`
    max-height: ${({ $isVisible }) => ($isVisible ? '500px' : '0px')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
`;

const SubMenuItem = styled.div`
    margin: 0 0 10px 16px;
    padding-left: 4px;
    cursor: pointer;
    font-size: 17px;
    line-height: 1.4;
    letter-spacing: -0.01em;
    font-weight: ${({ $isActive }) => ($isActive ? '700' : '500')};
    color: ${({ $isActive }) => ($isActive ? '#B9BEFF' : '#FFFFFF')};
    text-decoration: none;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: #C9CDFF;
        transform: translateX(1px);
    }
`;

// MainMenu 컴포넌트
const MainMenu = ({ onClick, label, isActive}) => (
    <MainMenuContainer onClick={onClick} >
        <MainMenuLabel $isActive={isActive}>{label}</MainMenuLabel>
        <ArrowIconWrap $isActive={isActive}>
            {isActive ? <RiArrowUpSLine fontSize={'24px'} /> : <RiArrowDownSLine fontSize={'24px'} />}
        </ArrowIconWrap>
    </MainMenuContainer>
);

// SubMenu 컴포넌트
const SubMenu = ({ items, activeItem, onItemClick }) => (
    <>
        {items.map((item, index) => (
            <SubMenuItem
                key={index}
                $isActive={activeItem === item}
                onClick={() => onItemClick(item)}
            >
                {item}
            </SubMenuItem>
        ))}
    </>
);

const OwnerMenu = ({setSelectedMenu}) => {
    const navigate = useNavigate();
    const setUserData = useSetRecoilState(userState);
    const logout = useLogout();
    const [activeMainMenus, setActiveMainMenus] = useState({});
    const [visibleSubMenus, setVisibleSubMenus] = useState({});
    const [activeTab, setActiveTab] = useState(null);

    const handleSwitchToUserHome = () => {
        Swal.fire({
            icon: 'question',
            title: '유저 홈으로 이동',
            text: '사업자 화면에서 나가서 유저 홈으로 이동하시겠어요?',
            showCancelButton: true,
            confirmButtonText: '이동',
            cancelButtonText: '취소',
        }).then((result) => {
            if (!result.isConfirmed) {
                return;
            }

            localStorage.setItem('moyeobangPreferredRoleType', ROLETYPE.USER);
            setUserData((prev) => ({
                ...prev,
                roleType: ROLETYPE.USER,
            }));
            navigate('/');
        });
    };

    const handleMainMenuClick = (menuIndex, isFunction) => {
        setActiveMainMenus(prevState => ({
            ...prevState,
            [menuIndex]: !prevState[menuIndex]
        }));

        setVisibleSubMenus(prevState => ({
            ...prevState,
            [menuIndex]: !prevState[menuIndex]
        }));
    };

    const handleSubMenuItemClick = (menuIndex, item) => {
        setActiveTab({ menuIndex, item });
        switch (item) {
            case '업체 등록':
                setSelectedMenu(OWNERMENU.STORE_REGISTRATION);
                break;
            case '업체 수정 및 삭제':
                setSelectedMenu(OWNERMENU.STORE_MODIFICATION);
                break;
            case '방탈출 등록':
                setSelectedMenu(OWNERMENU.ESCAPE_ROOM_REGISTRATION);
                break;
            case '방탈출 수정 및 삭제':
                setSelectedMenu(OWNERMENU.ESCAPE_ROOM_MODIFICATION);
                break;
            case '예약금 확인':
                setSelectedMenu(OWNERMENU.RESERVATION_DEPOSIT_CHECK);
                break;
            case '예약내역 관리':
                setSelectedMenu(OWNERMENU.RESERVATION_MANAGEMENT);
                break;
            default:
                break;
        }
    };

    const menus = [
        { label: '업체 관리', subItems: ['업체 등록', '업체 수정 및 삭제',] },
        { label: '방탈출 관리', subItems: ['방탈출 등록', '방탈출 수정 및 삭제'] },
        { label: '예약 관리', subItems: ['예약금 확인', '예약내역 관리'] },
    ];

    return (
        <Menu>
            <div style={{width: '90%'}}>
                <div style={{marginTop: '18px', marginLeft: '4px', marginBottom: '6px'}}>
                    <IoMdHome fontSize={'32px'}/>
                </div>
                <div style={{border: '1px solid white'}}></div>
                {menus.map((menu, index) => (
                    <div key={index}>
                        <MainMenu
                            onClick={() => handleMainMenuClick(index)}
                            label={menu.label}
                            isActive={activeMainMenus[index]}
                        />
                        <SubMenuContainer $isVisible={visibleSubMenus[index]}>
                            <SubMenu
                                items={menu.subItems}
                                activeItem={activeTab?.menuIndex === index ? activeTab.item : null}
                                onItemClick={(item) => handleSubMenuItemClick(index, item)}
                            />
                        </SubMenuContainer>
                        <div style={{border: '1px solid white'}}></div>
                    </div>
                ))}
            </div>

            <BottomActions>
                <SideActionButton type={'button'} onClick={handleSwitchToUserHome}>
                    유저 홈으로
                </SideActionButton>
                <SideLogoutButton type={'button'} onClick={logout}>
                    로그아웃
                </SideLogoutButton>
            </BottomActions>
        </Menu>
    );
};

export default OwnerMenu;