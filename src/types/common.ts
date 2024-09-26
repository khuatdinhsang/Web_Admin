export interface ResponseForm<T> {
    message: string;
    data: T;
    statusCode: number
}