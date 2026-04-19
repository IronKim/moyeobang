import React from 'react';
import UserDefaultHeader from "./header/UserDefaultHeader";
import UserFooter from "./footer/UserFooter";

const UserDefaultLayout = ({ children }) => {
    return (
        <div>
            <UserDefaultHeader />
            <main>{children}</main>
            <UserFooter />
        </div>
    );
};

export default UserDefaultLayout;