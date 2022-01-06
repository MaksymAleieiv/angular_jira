export interface ApiErrorResponseError {
    value: string;
    msg: string;
    param: string;
    location: string;
}

export interface ApiErrorResponse {
    comment: string;
    errors?: ApiErrorResponseError[];
}