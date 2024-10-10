import { ListProduct } from '../types/user';
import { ResponseForm } from '../types/common';
import axiosClient from '../configs/axiosClient';

const endpoint = '/blogs';

export const blog = {
    getList(): Promise<ResponseForm<any[]>> {
        return axiosClient.get(`${endpoint}/admin`);
    },
    addNew(product: any): Promise<ResponseForm<any>> {
        return axiosClient.post(`${endpoint}`, product)
    },
    update(id: number, newProduct: any): Promise<ResponseForm<any>> {
        return axiosClient.put(`${endpoint}/${id}`, newProduct)
    },
    delete(id: number): Promise<ResponseForm<any>> {
        return axiosClient.delete(`${endpoint}/${id}`)
    }
    
};