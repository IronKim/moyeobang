import React from 'react';
import SellerDefaultHeader from "./header/SellerDefaultHeader";
import SellerFooter from "./footer/SellerFooter";

const SellerDefaultLayout = ({ children }) => {
    return (
        <div>
            <SellerDefaultHeader />
            <main>{children}</main>
            <SellerFooter />
        </div>
    );
};

export default SellerDefaultLayout;