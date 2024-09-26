export interface LoginData {
    email: string;
    password: string;
}
export interface LoginResponse {
    accessToken: string;
}
export interface ListProduct {
    id?: number,
    name: string,
    price: number,
    description: string,
    image: string,
    quantity: number
}
export interface ForgotPasswordData {
    email: string,
    password: string,
    token: string
}
export interface ChangPassword {
    oldPassword: string,
    newPassword: string
}
export interface ProfileResponse {
    id?: number,
    email: string,
    fullname: string,
    avatar: string,
    phone: string,
    address: string,
    isActive: boolean,
    roles: string[]
}
export interface editProfileData {
    fullname: string,
    avatar: string,
    phone: string,
    address: string
}