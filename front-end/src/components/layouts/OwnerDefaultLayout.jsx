import React from 'react';
import OwnerDefaultHeader from "./header/OwnerDefaultHeader";
import OwnerFooter from "./footer/OwnerFooter";

const OwnerDefaultLayout = ({ children }) => {
    return (
        <div>
            <OwnerDefaultHeader />
            <main>{children}</main>
            <OwnerFooter />
        </div>
    );
};

export default OwnerDefaultLayout;