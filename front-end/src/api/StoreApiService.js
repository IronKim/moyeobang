import { apiClient } from './ApiClient';

export const registerStore = (storeRegisterRequest) => {
    const token = localStorage.getItem('moyeobangToken');

    return apiClient.post('api/v1/store', storeRegisterRequest, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
};

export const getMyStores = () => {
    const token = localStorage.getItem('moyeobangToken');

    return apiClient.get('api/v1/store/my', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
};

export const getStoreDetail = (storeId) => {
    const token = localStorage.getItem('moyeobangToken');

    return apiClient.get(`api/v1/store/${storeId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
};

export const updateStore = (storeId, storeUpdateRequest) => {
    const token = localStorage.getItem('moyeobangToken');

    return apiClient.put(`api/v1/store/${storeId}`, storeUpdateRequest, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
};

export const deleteStore = (storeId) => {
    const token = localStorage.getItem('moyeobangToken');

    return apiClient.delete(`api/v1/store/${storeId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
};
