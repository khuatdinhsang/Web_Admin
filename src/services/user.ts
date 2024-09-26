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
    }
};