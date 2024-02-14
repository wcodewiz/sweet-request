import axios, { InternalAxiosRequestConfig } from 'axios';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore;
export const BaseUrl = window.host;
export const HOST = BaseUrl;
//@ts-ignore;
export const Client = window.client;
//@ts-ignore;
export const SUB_URL = window.sub_url;

export const Config = () => {
    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const token: string = localStorage.getItem('token') ?? '';
        const bearerString = token !== '' ? `Bearer ${token}` : '';
        if (bearerString !== '') {
            config.headers.Authorization = bearerString;
        }
        config.withCredentials = true;
        return config;
    });
};
