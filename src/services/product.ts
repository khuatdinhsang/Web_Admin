import { ListProduct } from '../types/user';
import { ResponseForm } from '../types/common';
import axiosClient from '../configs/axiosClient';

const endpoint = '/products';

export const product = {
    getList(): Promise<ResponseForm<ListProduct[]>> {
        return axiosClient.get(`${endpoint}`);
    },
    addNew(product: ListProduct): Promise<ResponseForm<ListProduct>> {
        return axiosClient.post(`${endpoint}`, product)
    },
    update(id: number, newProduct: ListProduct): Promise<ResponseForm<ListProduct>> {
        return axiosClient.put(`${endpoint}/${id}`, newProduct)
    },
    statistical(): Promise<ResponseForm<any>> {
        return axiosClient.get(`/statistical`)
    }
};