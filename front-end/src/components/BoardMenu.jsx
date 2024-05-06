import React from 'react';
import {Menu} from "antd";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const BMenu = styled(Menu)`
    position: absolute;
    top: 400px;
    left: 3.27vw;
    width: 200px;
    
    && .ant-menu-item {
        background-color: #D4EBFB;
        border-radius: 20px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }

    && .ant-menu-item-selected {
        background-color: #96C2F6;
        color: white;
    }
    
    && .ant-menu-item:hover {
        background-color: #96C2F6;
        color: white;
    
    }

    && .ant-menu-item:not(.ant-menu-item-selected):hover {
        background-color: #96C2F6;
        color: white;

    }
    
    @media (max-width: 1200px){
        display: none;
    }
    
`

const MenuItem = styled(Menu.Item)`
    font-size: 20px;
    font-weight: bold;
    color: #96C2F6;
    border-radius: 20px;
    text-align: center;
    
    &:hover {
        cursor: pointer;
    }
`

const BoardMenu = ({defaultSelectedKeys}) => {
    const navegate = useNavigate();
    const onClickButton = (url) => {
        navegate(url);
    }

    return (
        <div>
            <BMenu style={{border: 'none'}} defaultSelectedKeys={defaultSelectedKeys}>
                <MenuItem onClick={() => onClickButton('/moyeobang')} key="moyeobang">모여방</MenuItem>
                <MenuItem onClick={() => onClickButton('/room')} key="room">방탈출</MenuItem>
            </BMenu>
        </div>
    );
};

export default BoardMenu;