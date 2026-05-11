import React, {useState} from 'react';
import MainContainer from "../../components/MainContainer";
import MainBox from "../../components/MainBox";
import styled from "styled-components";
import OwnerMenu from "./components/OwnerMenu";
import {OWNERMENU} from "../../constants/OWNERMENU";
import StoreRegistration from "./components/StoreRegistration";
import StoreModification from "./components/StoreModification";
import EscapeRoomRegistration from "./components/EscapeRoomRegistration";
import EscapeRoomModification from "./components/EscapeRoomModification";

const OwnerMain = styled.div`
    padding: 20px;
    width: 100%;
`

const OwnerHome = () => {
    const [selectedMenu, setSelectedMenu] = useState(OWNERMENU.HOME);

    return (
        <MainContainer backgroundColor={'#D2D2D2'} height={'100%'} style={{minHeight: '800px'}}>
            <MainBox width={'90%'} top={'-50px'} style={{display: 'flex', minHeight: '800px'}} height={'100%'} >
                <OwnerMenu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
                <OwnerMain>
                    {
                        selectedMenu === OWNERMENU.HOME && <div>HOME</div>
                    }
                    {
                        selectedMenu === OWNERMENU.STORE_REGISTRATION && <StoreRegistration />
                    }
                    {
                        selectedMenu === OWNERMENU.STORE_MODIFICATION && <StoreModification />
                    }
                    {
                        selectedMenu === OWNERMENU.ESCAPE_ROOM_REGISTRATION && <EscapeRoomRegistration />
                    }
                    {
                        selectedMenu === OWNERMENU.ESCAPE_ROOM_MODIFICATION && <EscapeRoomModification />
                    }
                </OwnerMain>
            </MainBox>
        </MainContainer>
    );
};

export default OwnerHome;