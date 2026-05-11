import { apiClient } from './ApiClient';

export const accountIdCheck = (accountId) => apiClient.get(`api/v1/auth/accountId-check/${accountId}`);

export const emailCheck = (email) => apiClient.get(`api/v1/auth/email-check`, { params: { email } });

export const accountJoin = (accountJoinRequest) => apiClient.post(`api/v1/auth/account/join`, accountJoinRequest);

export const accountLogin = (accountLoginRequest) => apiClient.post(`api/v1/auth/account/login`, accountLoginRequest);