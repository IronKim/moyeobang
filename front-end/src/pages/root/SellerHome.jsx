import React, {useState} from 'react';
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";
import styled from "styled-components";
import SellerMenu from "./components/SellerMenu";
import {SELLERMENU} from "../../constants/SELLERMENU";
import CompanyRegistration from "./components/CompanyRegistration";
import CompanyModification from "./components/CompanyModification";
import EscapeRoomRegistration from "./components/EscapeRoomRegistration";

const SellerMain = styled.div`
    padding: 20px;
    width: 100%;
`

const SellerHome = () => {
    const [selectedMenu, setSelectedMenu] = useState(SELLERMENU.HOME);

    return (
        <MainContainer backgroundColor={'#D2D2D2'} height={'100%'} style={{minHeight: '800px'}}>
            <MainBox width={'90%'} top={'-50px'} style={{display: 'flex', minHeight: '800px'}} height={'100%'} >
                <SellerMenu setSelectedMenu={setSelectedMenu} />
                <SellerMain>
                    {
                        selectedMenu === SELLERMENU.HOME && <div>HOME</div>
                    }
                    {
                        selectedMenu === SELLERMENU.COMPANY_REGISTRATION && <CompanyRegistration />
                    }
                    {
                        selectedMenu === SELLERMENU.COMPANY_MODIFICATION && <CompanyModification />
                    }
                    {
                        selectedMenu === SELLERMENU.ESCAPE_ROOM_REGISTRATION && <EscapeRoomRegistration />
                    }
                </SellerMain>
            </MainBox>
        </MainContainer>
    );
};

export default SellerHome;