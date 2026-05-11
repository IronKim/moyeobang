import { apiClient } from './ApiClient';

export const registerStore = (storeRegisterRequest) => {
    const token = localStorage.getItem('moyeobangToken');

    return apiClient.post('api/v1/store', storeRegisterRequest, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
};
