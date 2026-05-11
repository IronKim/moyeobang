import React from 'react';
import OwnerSimpleHeader from "./header/OwnerSimpleHeader";

const OwnerManagementLayout = ({ children }) => {
    return (
        <div>
            <OwnerSimpleHeader/>
            <main>{children}</main>
        </div>
    );
};

export default OwnerManagementLayout;