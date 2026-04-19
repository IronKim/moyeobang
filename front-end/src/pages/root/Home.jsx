import React from 'react';
import {useRecoilValue} from "recoil";
import {userState} from "../../atoms/userState";
import UserDefaultLayout from "../../components/layouts/UserDefaultLayout";
import UserHome from "./UserHome";
import SellerManagementLayout from "../../components/layouts/SellerManagementLayout";
import SellerHome from "./SellerHome";

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
                    <SellerManagementLayout>
                        <SellerHome />
                    </SellerManagementLayout>
                )
            }
        </>
    );
};

export default Home;