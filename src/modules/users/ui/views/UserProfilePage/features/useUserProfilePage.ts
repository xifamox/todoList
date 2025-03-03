import { ref, computed } from 'vue';
import { useUserService } from '@/modules/users/infrastructure/services/useUsersService';
import { useUsersStore } from '@/modules/users/infrastructure/stores/useUsersStore';
import { NUsers } from '@/modules/users/domain';

export function useUserProfile(userId: number) {
	const usersStore = useUsersStore();
	const usersService = useUserService();

	const user = ref<NUsers.IUser>({} as NUsers.IUser);
	const originalUser = ref<NUsers.IUser | null>(null);
	const isEditing = ref(false);
	const errorMessage = computed(() => usersStore.error?.message || null);

	const fetchUser = async () => {
		usersStore.setError(null);
		const userData = await usersService.fetchUser(userId);
		if (userData) {
			user.value = { ...userData };
			originalUser.value = { ...userData };
		}
	};

	const saveChanges = async () => {
		usersStore.setError(null);
		if (!user.value || !originalUser.value) return;

		const updatedFields: Partial<NUsers.IUser> = {};
		Object.keys(user.value).forEach((key) => {
			const typedKey = key as keyof NUsers.IUser;
			if (user.value[typedKey] !== originalUser.value![typedKey]) {
				updatedFields[typedKey] = user.value[typedKey] as never;
			}
		});

		if (Object.keys(updatedFields).length === 0) {
			isEditing.value = false;
			return;
		}

		const updatedData = await usersService.updateUser(userId, updatedFields);
		if (updatedData) {
			user.value = { ...updatedData };
			originalUser.value = { ...updatedData };
			isEditing.value = false;
		}
	};

	return {
		user,
		isEditing,
		errorMessage,
		fetchUser,
		saveChanges,
		toggleEdit: () => (isEditing.value = !isEditing.value)
	};
}
