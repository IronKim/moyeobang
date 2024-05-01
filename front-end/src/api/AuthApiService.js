import { apiClient } from './ApiClient';

export const accountIdCheck = (accountId) => apiClient.get(`api/v1/auth/accountId-check/${accountId}`);

export const userJoin = (userJoinRequest) => apiClient.post(`api/v1/auth/user-join`, userJoinRequest);