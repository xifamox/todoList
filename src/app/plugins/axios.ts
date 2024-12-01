import axios, { AxiosInstance } from 'axios';
import appConfig from '../config/app.config';
import { useAuthStore } from '@/modules/auth/infrastructure/stores/useAuthStore';
import router from '@/app/router';

const instance: AxiosInstance = axios.create({
	baseURL: appConfig.apiBaseUrl,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
});

instance.interceptors.request.use(
	(config) => {
		const authStore = useAuthStore();
		if (authStore.accessToken) {
			config.headers = new axios.AxiosHeaders({
				...config.headers,
				Authorization: `Bearer ${authStore.accessToken}`
			});
		}
		return config;
	},
	(error) => {
		return Promise.reject(new Error(error));
	}
);

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			const authStore = useAuthStore();
			try {
				if (!authStore.isLoading) {
					await authStore.refreshTokens();
					error.config.headers.Authorization = `Bearer ${authStore.accessToken}`;
					return instance.request(error.config);
				}
			} catch {
				authStore.resetAuthState();
				router.push('/auth/login');
			}
		}
		return Promise.reject(new Error(error.response.data));
	}
);

export default instance;
