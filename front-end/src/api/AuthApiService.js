import { apiClient } from './ApiClient';

export const accountIdCheck = (accountId) => apiClient.get(`api/v1/auth/accountId-check/${accountId}`);

export const accountJoin = (accountJoinRequest) => apiClient.post(`api/v1/auth/account/join`, accountJoinRequest);

export const sellerJoin = (sellerJoinRequest) => apiClient.post(`api/v1/auth/seller-join`, sellerJoinRequest);

export const userLogin = (userLoginRequest) => apiClient.post(`api/v1/auth/account/login`, userLoginRequest);

export const sellerLogin = (sellerLoginRequest) => apiClient.post(`api/v1/auth/seller-login`, sellerLoginRequest);