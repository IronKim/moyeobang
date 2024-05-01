import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from './pages/login/UserLogin';
import Header from './components/Header';
import Footer from './components/Footer';
import UserSignup from './pages/signup/UserSignup';

const View = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='login'>
                        <Route path='user' element={<UserLogin />} />
                    </Route>
                    <Route path='sign-up'>
                        <Route path='user' element={<UserSignup />} />
                    </Route>
                    <Route path="*" />
                </Routes>
                <Footer />

            </BrowserRouter>
        </div>
    );
};

export default View;