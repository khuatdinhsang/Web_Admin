import { ResponseForm } from '../types/common';
import axiosClient from '../configs/axiosClient';
import { ProfileResponse, editProfileData } from '../types/user';

const endpoint = '/users';

export const user = {
    getProfile(): Promise<ResponseForm<ProfileResponse>> {
        return axiosClient.get(`${endpoint}/me`);
    },
    editProfile(profile: editProfileData): Promise<ResponseForm<any>> {
        return axiosClient.put(`${endpoint}/me`, profile);
    },
    getList(): Promise<ResponseForm<any[]>> {
        return axiosClient.get(`${endpoint}`);
    },
    update(id: number, newUser: any): Promise<ResponseForm<any>> {
        return axiosClient.put(`${endpoint}/${id}`, newUser)
    },
    activeUser(id: number,status:boolean ): Promise<ResponseForm<any>> {
        return axiosClient.put(`${endpoint}/${id}/status`,{status:status})
    }
};