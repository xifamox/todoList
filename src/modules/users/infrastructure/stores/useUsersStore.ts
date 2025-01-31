import { defineStore } from 'pinia';
import { initialUserState, NUsers } from '../../domain';
import { fetchStateInitialState } from '@/shared/domain';
import { Roles } from '../../types';
import { useUsersModel } from '../models/useUsersModel';

export const useUsersStore = defineStore('users', {
	state: (): NUsers.IState => ({
		...fetchStateInitialState,
		...initialUserState
	}),
	actions: {
		setUsers(meta: NUsers.IMetaResponse) {
			this.users = meta.data;
			this.meta = meta.meta;
		},
		updateUser(userId: number, updatedUser: NUsers.IUser) {
			const userIndex = this.users.findIndex((user) => user.id === userId);
			if (userIndex !== -1) {
				this.users[userIndex] = updatedUser;
			}
		},
		async updateRoles(userId: number, roles: Roles[]) {
			this.isLoading = true;
			this.error = null;

			try {
				const usersModel = useUsersModel();
				const response = await usersModel.updateRoles(userId, { roles });

				if (response.data) {
					this.updateUser(response.data.id, response.data);
				} else {
					this.error = response.error;
				}
			} catch (error) {
				this.error = { message: 'Ошибка обновления ролей', statusCode: 500 };
			} finally {
				this.isLoading = false;
			}
		},
		removeUser(userId: number) {
			this.users = this.users.filter((user) => user.id !== userId);
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
		setError(error: NUsers.IError | null) {
			this.error = error;
		}
	}
});
