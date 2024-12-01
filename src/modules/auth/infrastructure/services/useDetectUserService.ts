// services/useDetectUserService.ts
import { NAuth } from '../../domain';
import { useAuthModel } from '../models';
import { useAuthStore } from '../stores';

export function useDetectUserService() {
	const authStore = useAuthStore();
	const { login, register } = useAuthModel();

	const handleLogin = async (payload: NAuth.ILoginPayload) => {
		authStore.setIsLoading(true);
		authStore.setError(null);

		try {
			const response = await login(payload);
			if (response.data) {
				const { user, accessToken, refreshToken } = response.data;
				authStore.setAuth({ user, accessToken, refreshToken });
				return true;
			}
			authStore.setError(response.error);
		} catch (error) {
			authStore.setError(error as NAuth.IError | null);
		} finally {
			authStore.setIsLoading(false);
		}
		return false;
	};

	const handleRegister = async (payload: NAuth.IRegisterPayload) => {
		authStore.setIsLoading(true);
		authStore.setError(null);

		try {
			const response = await register(payload);
			if (response.data) {
				authStore.setAuth(response.data);
				return true;
			}
			authStore.setError(response.error);
		} catch (error) {
			authStore.setError(error as NAuth.IError | null);
		} finally {
			authStore.setIsLoading(false);
		}
		return false;
	};

	return {
		handleLogin,
		handleRegister
	};
}
