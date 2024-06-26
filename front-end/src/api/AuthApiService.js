import { apiClient } from './ApiClient';

export const accountIdCheck = (accountId) => apiClient.get(`api/v1/auth/accountId-check/${accountId}`);

export const userJoin = (userJoinRequest) => apiClient.post(`api/v1/auth/user-join`, userJoinRequest);

export const sellerJoin = (sellerJoinRequest) => apiClient.post(`api/v1/auth/seller-join`, sellerJoinRequest);

export const userLogin = (userLoginRequest) => apiClient.post(`api/v1/auth/user-login`, userLoginRequest);

export const sellerLogin = (sellerLoginRequest) => apiClient.post(`api/v1/auth/seller-login`, sellerLoginRequest);