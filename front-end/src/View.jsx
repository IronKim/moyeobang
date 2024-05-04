import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserLogin from './pages/login/UserLogin';
import Header from './components/Header';
import Footer from './components/Footer';
import UserSignup from './pages/signup/UserSignup';
import SellerLogin from "./pages/login/SellerLogin";
import SellerSignup from "./pages/signup/SellerSignup";
import {useSetupUserDataByToken} from "./hooks/useUser";
import {ReactQueryDevtools} from "react-query/devtools";

const View = () => {
    const setupUserDataByToken = useSetupUserDataByToken();

    useEffect(() => {
        setupUserDataByToken();
    }, [setupUserDataByToken]);

    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='login'>
                        <Route path='user' element={<UserLogin />} />
                        <Route path='seller' element={<SellerLogin />} />
                    </Route>
                    <Route path='sign-up'>
                        <Route path='user' element={<UserSignup />} />
                        <Route path='seller' element={<SellerSignup />} />
                    </Route>
                    <Route path="*" />
                </Routes>
                <Footer />
                <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
            </BrowserRouter>
        </div>
    );
};

export default View;