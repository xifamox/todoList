import { NUsers } from '../../domain';
import { Roles } from '../../types';
import { useUsersModel } from '../models/useUsersModel';
import { useUsersStore } from '../stores/useUsersStore';

export function useUserService() {
	const usersStore = useUsersStore();
	const usersModel = useUsersModel();

	const fetchUsers = async (filters: NUsers.IUserFilters) => {
		usersStore.setIsLoading(true);
		usersStore.setError(null);

		try {
			const response = await usersModel.fetchUsers(filters);
			if (response.data) {
				usersStore.setUsers(response.data);
			} else {
				usersStore.setError(response.error);
			}
		} catch (error) {
			usersStore.setError({
				message: (error as Error).message || 'Ошибка загрузки пользователей',
				statusCode: 500
			});
		} finally {
			usersStore.setIsLoading(false);
		}
	};

	const updateUserRoles = async (userId: number, roles: Roles[]) => {
		usersStore.setIsLoading(true);
		usersStore.setError(null);

		try {
			const response = await usersModel.updateRoles(userId, { roles });
			if (response.data) {
				usersStore.updateRoles(response.data.id, response.data.roles);
			} else {
				usersStore.setError(response.error);
			}
			usersStore.setError(response.error);
		} catch (error) {
			usersStore.setError({
				message: (error as Error).message || 'Ошибка обновления ролей',
				statusCode: 500
			});
		} finally {
			usersStore.setIsLoading(false);
		}
	};

	const updateUser = async (
		userId: number,
		payload: NUsers.IUserUpdateRequest
	): Promise<NUsers.IUser | null> => {
		usersStore.setIsLoading(true);
		usersStore.setError(null);

		try {
			const response = await usersModel.updateUser(userId, payload);
			if (response.data) {
				return response.data;
			}
			usersStore.setError(response.error);
		} catch (error) {
			usersStore.setError({
				message: (error as Error).message || 'Ошибка обновления пользователя',
				statusCode: 500
			});
		} finally {
			usersStore.setIsLoading(false);
		}

		return null;
	};

	const fetchUser = async (userId: number) => {
		usersStore.setIsLoading(true);
		usersStore.setError(null);

		try {
			const response = await usersModel.fetchUser(userId);
			if (response.data) {
				return response.data;
			}
			usersStore.setError(response.error);
		} catch (error) {
			usersStore.setError({
				message: (error as Error).message || 'Ошибка загрузки пользователя',
				statusCode: 500
			});
		} finally {
			usersStore.setIsLoading(false);
		}
		return null;
	};

	const deleteUser = async (userId: number) => {
		usersStore.setIsLoading(true);
		usersStore.setError(null);

		try {
			await usersModel.deleteUser(userId);
			usersStore.removeUser(userId);
		} catch (error) {
			usersStore.setError({
				message: (error as Error).message || 'Ошибка при удалении пользователя',
				statusCode: 500
			});
		} finally {
			usersStore.setIsLoading(false);
		}
	};

	const blockUser = async (userId: number) => {
		usersStore.setIsLoading(true);
		try {
			const response = await usersModel.blockUser(userId);
			if (response.data) {
				usersStore.updateUser(response.data.id, response.data);
			}
		} catch (error) {
			usersStore.setError({
				message:
					(error as Error).message || 'Ошибка при блокировке пользователя',
				statusCode: 500
			});
		} finally {
			usersStore.setIsLoading(false);
		}
	};

	const unblockUser = async (userId: number) => {
		usersStore.setIsLoading(true);
		try {
			const response = await usersModel.unblockUser(userId);
			if (response.data) {
				usersStore.updateUser(response.data.id, response.data);
			}
		} catch (error) {
			usersStore.setError({
				message:
					(error as Error).message || 'Ошибка при разблокировке пользователя',
				statusCode: 500
			});
		} finally {
			usersStore.setIsLoading(false);
		}
	};

	return {
		fetchUsers,
		updateUserRoles,
		fetchUser,
		updateUser,
		deleteUser,
		blockUser,
		unblockUser
	};
}
