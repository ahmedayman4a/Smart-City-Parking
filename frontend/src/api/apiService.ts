// apiService.ts
import apiClient from './apiClient';

export const apiGet = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
};

export const apiPost = async <T>(url: string, data: Record<string, any>): Promise<T> => {
  const response = await apiClient.post<T>(url, data);
  return response.data;
};

export const apiPut = async <T>(url: string, data: Record<string, any>): Promise<T> => {
  const response = await apiClient.put<T>(url, data);
  return response.data;
};
