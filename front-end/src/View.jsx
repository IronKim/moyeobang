import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSetupUserDataByToken } from "./hooks/useUser";
import SellerLogin from "./pages/login/SellerLogin";
import UserLogin from "./pages/login/UserLogin";
import UserSignup from "./pages/signup/UserSignup";
import SellerSignup from "./pages/signup/SellerSignup";
import { ReactQueryDevtools } from "react-query/devtools";
import UserDefaultLayout from "./components/layouts/UserDefaultLayout";
import SellerDefaultLayout from "./components/layouts/SellerDefaultLayout";
import Home from "./pages/root/Home";
import MoyeobangBoard from "./pages/moyeobangBoard/MoyeobangBoard";
import RoomBoard from "./pages/roomBoard/RoomBoard";
import MoyeobangBoardDetail from "./pages/moyeobangBoard/MoyeobangBoardDetail";
import RoomBoardDetail from "./pages/roomBoard/RoomBoardDetail";

const View = () => {
    const setupUserDataByToken = useSetupUserDataByToken();

    useEffect(() => {
        setupUserDataByToken();
    }, [setupUserDataByToken]);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <Home />
                    } />
                    <Route path='moyeobang' element={
                        <UserDefaultLayout>
                            <MoyeobangBoard />
                        </UserDefaultLayout>
                    } />
                    <Route path='moyeobang/detail/:id' element={
                        <UserDefaultLayout>
                            <MoyeobangBoardDetail />
                        </UserDefaultLayout>
                    } />
                    <Route path='room' element={
                        <UserDefaultLayout>
                            <RoomBoard />
                        </UserDefaultLayout>
                    } />
                    <Route path='room/detail/:id' element={
                        <UserDefaultLayout>
                            <RoomBoardDetail />
                        </UserDefaultLayout>
                    } />
                    <Route path='login'>
                        <Route path='user' element={
                            <UserDefaultLayout>
                                <UserLogin />
                            </UserDefaultLayout>
                        } />
                        <Route path='seller' element={
                            <SellerDefaultLayout>
                                <SellerLogin />
                            </SellerDefaultLayout>
                        } />
                    </Route>
                    <Route path='sign-up'>
                        <Route path='user' element={
                            <UserDefaultLayout>
                                <UserSignup />
                            </UserDefaultLayout>
                        } />
                        <Route path='seller' element={
                            <SellerDefaultLayout>
                                <SellerSignup />
                            </SellerDefaultLayout>
                        } />
                    </Route>
                    <Route path="*" />
                </Routes>
                <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
            </BrowserRouter>
        </div>
    );
};

export default View;