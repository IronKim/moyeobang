import React from 'react';
import {useRecoilValue} from "recoil";
import {userState} from "../../atoms/userState";
import UserDefaultLayout from "../../components/layouts/UserDefaultLayout";
import UserHome from "./UserHome";
import OwnerManagementLayout from "../../components/layouts/OwnerManagementLayout";
import OwnerHome from "./OwnerHome";

const Home = () => {
    const userData = useRecoilValue(userState);

    return (
        <>
            {
                userData.roleType === 'USER' ? (
                    <UserDefaultLayout>
                        <UserHome />
                    </UserDefaultLayout>
                ) : (
                    <OwnerManagementLayout>
                        <OwnerHome />
                    </OwnerManagementLayout>
                )
            }
        </>
    );
};

export default Home;