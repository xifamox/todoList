import { ApiClient } from '@/shared/infrastructure/api';
import { NAuth } from '../../domain';
import { RequestReturnValue } from '@/shared/types/api';

export const useAuthModel = (): NAuth.IModel => {
	const login = (
		payload: NAuth.ILoginPayload
	): Promise<
		RequestReturnValue<{
			user: NAuth.IUserProfile;
			accessToken: string;
			refreshToken: string;
		}>
	> => {
		const response = ApiClient.post<
			NAuth.ITokens & { user: NAuth.IUserProfile }
		>(`${NAuth.API_NAMESPACE}/signin`, payload);
		return response;
	};

	const register = async (
		payload: NAuth.IRegisterPayload
	): Promise<
		RequestReturnValue<{
			user: NAuth.IUserProfile;
			accessToken: string;
			refreshToken: string;
		}>
	> => {
		const response = await ApiClient.post<
			NAuth.ITokens & { user: NAuth.IUserProfile }
		>(`${NAuth.API_NAMESPACE}/signup`, payload);
		return response;
	};

	return {
		login,
		register
	};
};
