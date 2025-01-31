import { ApiClient } from '@/shared/infrastructure/api';
import { NAuth } from '../../domain';
import { RequestReturnValue } from '@/shared/types/api';

export const useAuthModel = (): NAuth.IModel => {
	const login = (
		payload: NAuth.ILoginPayload
	): Promise<
		RequestReturnValue<NAuth.ITokens & { user: NAuth.IUserProfile }>
	> => {
		return ApiClient.post(`${NAuth.API_NAMESPACE}/signin`, payload);
	};

	const register = async (
		payload: NAuth.IRegisterPayload
	): Promise<
		RequestReturnValue<NAuth.ITokens & { user: NAuth.IUserProfile }>
	> => {
		return ApiClient.post(`${NAuth.API_NAMESPACE}/signup`, payload);
	};

	return {
		login,
		register
	};
};
