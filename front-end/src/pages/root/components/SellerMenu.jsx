import React, {useState} from 'react';
import styled from "styled-components";
import {RiArrowDownSLine, RiArrowUpSLine} from "react-icons/ri";
import {IoMdHome} from "react-icons/io";
import {SELLERMENU} from "../../../constants/SELLERMENU";

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 255px;
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

const SellerMenu = ({setSelectedMenu}) => {
    const [activeMainMenus, setActiveMainMenus] = useState({});
    const [visibleSubMenus, setVisibleSubMenus] = useState({});
    const [activeTab, setActiveTab] = useState(null);

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
                setSelectedMenu(SELLERMENU.COMPANY_REGISTRATION);
                break;
            case '업체 수정 및 삭제':
                setSelectedMenu(SELLERMENU.COMPANY_MODIFICATION);
                break;
            case '방탈출 등록':
                setSelectedMenu(SELLERMENU.ESCAPE_ROOM_REGISTRATION);
                break;
            case '방탈출 수정 및 삭제':
                setSelectedMenu(SELLERMENU.ESCAPE_ROOM_MODIFICATION);
                break;
            case '예약금 확인':
                setSelectedMenu(SELLERMENU.RESERVATION_DEPOSIT_CHECK);
                break;
            case '예약내역 관리':
                setSelectedMenu(SELLERMENU.RESERVATION_MANAGEMENT);
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
        </Menu>
    );
};

export default SellerMenu;