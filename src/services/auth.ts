import { LoginResponse, LoginData, ForgotPasswordData, ChangPassword } from '../types/user';
import { ResponseForm } from '../types/common';
import axiosClient from '../configs/axiosClient';

const endpoint = '/auth';

export const auth = {
    login(data: LoginData): Promise<ResponseForm<LoginResponse>> {
        return axiosClient.post(`${endpoint}/login-admin`, data);
    },
    getCode(email: string): Promise<ResponseForm<boolean>> {
        return axiosClient.get(`${endpoint}/forgot-password?email=${email}`);
    },
    forgotPassword(data: ForgotPasswordData): Promise<ResponseForm<boolean>> {
        return axiosClient.post(`${endpoint}/reset-password`, data);
    },
    changePassword(data: ChangPassword): Promise<ResponseForm<boolean>> {
        return axiosClient.post(`${endpoint}/change-password`, data);
    },

};