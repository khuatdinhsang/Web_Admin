export const getAccessTokenFromLS = () =>
    localStorage.getItem('accessToken') || '';
export const setAccessToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
};
export const clearAccessToken = () => {
    localStorage.removeItem('accessToken');
};