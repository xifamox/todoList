import { RequestReturnValue } from '@/shared/types/api';
export declare const ApiClient: {
    get<T>(url: string): Promise<RequestReturnValue<T>>;
    post<T_1>(url: string, data?: any): Promise<RequestReturnValue<T_1>>;
    put<T_2>(url: string, data?: any): Promise<RequestReturnValue<T_2>>;
    delete<T_3>(url: string): Promise<RequestReturnValue<T_3>>;
};
