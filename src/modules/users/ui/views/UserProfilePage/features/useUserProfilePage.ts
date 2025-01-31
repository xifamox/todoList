import { ref, computed } from 'vue';
import { useUserService } from '@/modules/users/infrastructure/services/useUsersService';
import { useUsersStore } from '@/modules/users/infrastructure/stores/useUsersStore';
import { NUsers } from '@/modules/users/domain';

export function useUserProfile(userId: number) {
	const usersStore = useUsersStore();
	const usersService = useUserService();

	const user = ref<NUsers.IUser>({} as NUsers.IUser);
	const isEditing = ref(false);
	const errorMessage = computed(() => usersStore.error?.message || null);

	const fetchUser = async () => {
		usersStore.setError(null);
		const userData = await usersService.fetchUser(userId);
		if (userData) user.value = userData;
	};

	const saveChanges = async (updatedFields: Partial<NUsers.IUser>) => {
		usersStore.setError(null);

		if (!user.value) return;

		const updatedData = await usersService.updateUser(userId, updatedFields);
		if (updatedData) {
			user.value = updatedData;
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
