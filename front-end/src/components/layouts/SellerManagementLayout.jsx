import React from 'react';
import SellerSimpleHeader from "./header/SellerSimpleHeader";

const SellerManagementLayout = ({ children }) => {
    return (
        <div>
            <SellerSimpleHeader/>
            <main>{children}</main>
        </div>
    );
};

export default SellerManagementLayout;