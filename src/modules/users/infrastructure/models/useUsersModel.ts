import { ApiClient } from '@/shared/infrastructure/api';
import { NUsers } from '../../domain';
import { MetaResponse, UserRolesRequest } from '../../types';
import { RequestReturnValue } from '@/shared/types/api';

export const useUsersModel = (): NUsers.IModel => {
	const fetchUsers = async (
		filters: NUsers.IUserFilters
	): Promise<RequestReturnValue<MetaResponse<NUsers.IUser>>> => {
		const queryParams = new URLSearchParams(filters as Record<string, string>);
		return ApiClient.get<MetaResponse<NUsers.IUser>>(
			`${NUsers.API_NAMESPACE}?${queryParams.toString()}`
		);
	};

	const updateUser = async (
		userId: number,
		payload: NUsers.IUserUpdateRequest
	): Promise<RequestReturnValue<NUsers.IUser>> => {
		return ApiClient.put<NUsers.IUser>(
			`${NUsers.API_NAMESPACE}/${userId}`,
			payload
		);
	};

	const fetchUser = async (
		userId: number
	): Promise<RequestReturnValue<NUsers.IUser>> => {
		return ApiClient.get<NUsers.IUser>(`${NUsers.API_NAMESPACE}/${userId}`);
	};

	const updateRoles = async (
		userId: number,
		payload: UserRolesRequest
	): Promise<RequestReturnValue<NUsers.IUser>> => {
		return ApiClient.post<NUsers.IUser>(
			`${NUsers.API_NAMESPACE}/${userId}/rights`,
			payload
		);
	};

	const deleteUser = async (userId: number): Promise<void> => {
		const response = await ApiClient.delete<void>(
			`${NUsers.API_NAMESPACE}/${userId}`
		);
		if (response.error) {
			throw new Error(response.error.message || 'Ошибка удаления пользователя');
		}
	};

	const blockUser = async (
		userId: number
	): Promise<RequestReturnValue<NUsers.IUser>> => {
		return ApiClient.post<NUsers.IUser>(
			`${NUsers.API_NAMESPACE}/${userId}/block`
		);
	};

	const unblockUser = async (
		userId: number
	): Promise<RequestReturnValue<NUsers.IUser>> => {
		return ApiClient.post<NUsers.IUser>(
			`${NUsers.API_NAMESPACE}/${userId}/unblock`
		);
	};

	return {
		fetchUsers,
		updateUser,
		fetchUser,
		updateRoles,
		deleteUser,
		blockUser,
		unblockUser
	};
};
