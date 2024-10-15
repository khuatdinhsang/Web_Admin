import { ResponseForm } from '../types/common';
import axiosClient from '../configs/axiosClient';

const endpoint = '/orders';

export const order = {
    getList(): Promise<ResponseForm<any[]>> {
        return axiosClient.get(`${endpoint}`);
    },
    update(id: number, status: any): Promise<ResponseForm<any>> {
        return axiosClient.put(`${endpoint}/update-status/${id}`, status)
    },
};