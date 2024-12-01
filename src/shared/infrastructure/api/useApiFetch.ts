import apiClient from '@/app/plugins/axios';
import { RequestReturnError, RequestReturnValue } from '@/shared/types/api';
import { AxiosResponse } from 'axios';

function handleResponse<T>(response: AxiosResponse<T>): RequestReturnValue<T> {
	return {
		data: response.data || null,
		error: null,
		statusCode: response.status
	} as RequestReturnValue<T>;
}

function handleError<T>(error: RequestReturnError): RequestReturnValue<T> {
	return {
		data: null as T | null,
		error: {
			message: error.message || 'Unknown error',
			statusCode: error.statusCode || 500
		},
		statusCode: error.statusCode || 500
	};
}

export const ApiClient = {
	async get<T>(url: string): Promise<RequestReturnValue<T>> {
		return apiClient
			.get(url)
			.then(handleResponse)
			.catch(handleError<T>);
	},
	async post<T>(url: string, data?: any): Promise<RequestReturnValue<T>> {
		return apiClient
			.post(url, data)
			.then(handleResponse<T>)
			.catch(handleError<T>);
	},
	async put<T>(url: string, data?: any): Promise<RequestReturnValue<T>> {
		return apiClient
			.put(url, data)
			.then(handleResponse)
			.catch(handleError<T>);
	},
	async delete<T>(url: string): Promise<RequestReturnValue<T>> {
		return apiClient
			.delete(url)
			.then(handleResponse)
			.catch(handleError<T>);
	}
};
