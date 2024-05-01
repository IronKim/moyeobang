import { apiClient } from './ApiClient';

export const filesUpload = (files) => apiClient.post(`api/v1/storage/upload`, files);