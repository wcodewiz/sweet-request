import axios, { AxiosResponse } from 'axios';
import { BaseUrl, SUB_URL } from '../config';
import { AppUtils } from './appUtils';

export interface requestProp {
    url?: string;
    data?: object | FormData;
    id?: number;
    callback?: (json: any) => any;
    error?: (json: any, status?: number) => any;
    onProgress?: (current: number, total: number) => void;
}

export const postRequest = (prop: requestProp) => {
    const form: FormData = AppUtils.parseForm(prop);
    const url = `${BaseUrl}${SUB_URL}/${prop.url}`;

    return axios
        .post(url, form, {
            onDownloadProgress: (progress) => {
                const total = progress.total ?? 1;
                const percentCompleted = Math.round((progress.loaded * 100) / total);
                prop.onProgress && prop.onProgress(percentCompleted, total);
            },
            onUploadProgress: (progress) => {
                const total = progress.total ?? 1;
                const percentCompleted = Math.round((progress.loaded * 100) / total);
                prop.onProgress && prop.onProgress(percentCompleted, total);
            }
        })
        .then((value: AxiosResponse<any, any>) => {
            const json = value.data;
            if (prop.callback !== undefined) {
                return prop.callback(json);
            }
            return json;
        })
        .catch((err) => {
            if (prop.error !== undefined) {
                return prop.error(err!.response ?? { message: 'something went wrong' }, err!.status);
            }
            return err;
        });
};

export const getRequest = (prop: requestProp) => {
    return axios
        .get(`${BaseUrl}${SUB_URL}/${prop.url}`, {
            onDownloadProgress: (progress) => {
                const total = progress.total ?? 1;
                const percentCompleted = Math.round((progress.loaded * 100) / total);
                prop.onProgress && prop.onProgress(percentCompleted, total);
            },
            onUploadProgress: (progress) => {
                const total = progress.total ?? 1;
                const percentCompleted = Math.round((progress.loaded * 100) / total);
                prop.onProgress && prop.onProgress(percentCompleted, total);
            }
        })
        .then((value: AxiosResponse<any, any>) => {
            const json = value.data;
            if (prop.callback !== undefined) {
                return prop.callback(json);
            }
            return json;
        })
        .catch((err) => {
            if (prop.error !== undefined) {
                return prop.error(err!.response ?? { message: 'something went wrong' }, err!.status);
            }
            return err;
        });
};

export const deleteRequest = (prop: requestProp) => {
    return axios
        .delete(`${BaseUrl}${SUB_URL}/${prop.url}`, {
            onDownloadProgress: (progress) => {
                const total = progress.total ?? 1;
                const percentCompleted = Math.round((progress.loaded * 100) / total);
                prop.onProgress && prop.onProgress(percentCompleted, total);
            },
            onUploadProgress: (progress) => {
                const total = progress.total ?? 1;
                const percentCompleted = Math.round((progress.loaded * 100) / total);
                prop.onProgress && prop.onProgress(percentCompleted, total);
            }
        })
        .then((value: AxiosResponse<any, any>) => {
            const json = value.data;
            if (prop.callback !== undefined) {
                return prop.callback(json);
            }
            return json;
        })
        .catch((err) => {
            if (prop.error !== undefined) {
                return prop.error(err!.response ?? { message: 'something went wrong' }, err!.status);
            }
            return err;
        });
};
