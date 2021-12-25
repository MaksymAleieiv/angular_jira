export interface ApiErrorResponseError {
    value: string;
    msg: string;
    param: string;
    location: string;
}

export interface ApiErrorResponse {
    message: string;
    errors?: ApiErrorResponseError[];
}