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
import {useRecoilValue} from "recoil";
import {selectedStoreState} from "../../atoms/selectedStoreState";

const OwnerMain = styled.div`
    padding: 20px;
    width: 100%;
`

const OwnerHome = () => {
    const [selectedMenu, setSelectedMenu] = useState(OWNERMENU.HOME);
    const selectedStoreId = useRecoilValue(selectedStoreState);

    return (
        <MainContainer backgroundColor={'#D2D2D2'} height={'100%'} style={{minHeight: '800px'}}>
            <MainBox width={'90%'} top={'-50px'} style={{display: 'flex', minHeight: '800px'}} height={'100%'} >
                <OwnerMenu setSelectedMenu={setSelectedMenu} />
                <OwnerMain>
                    {
                        selectedMenu === OWNERMENU.HOME && <div>HOME</div>
                    }
                    {
                        selectedMenu === OWNERMENU.STORE_REGISTRATION && <StoreRegistration />
                    }
                    {
                        selectedMenu === OWNERMENU.STORE_MODIFICATION && <StoreModification selectedStoreId={selectedStoreId} />
                    }
                    {
                        selectedMenu === OWNERMENU.ESCAPE_ROOM_REGISTRATION && <EscapeRoomRegistration selectedStoreId={selectedStoreId} />
                    }
                    {
                        selectedMenu === OWNERMENU.ESCAPE_ROOM_MODIFICATION && <EscapeRoomModification selectedStoreId={selectedStoreId} />
                    }
                </OwnerMain>
            </MainBox>
        </MainContainer>
    );
};

export default OwnerHome;