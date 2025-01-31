<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserService } from '@/modules/users/infrastructure/services/useUsersService';
import UsersFilter from '../../components/UsersFilter/UsersFilter.vue';
import UsersTable from '../../components/UsersTable/UsersTable.vue';
import router from '@/app/router';
import UsersDialog from '../../components/UsersDialog/UsersDialog.vue';
import { Roles } from '@/modules/users/types';
import { NUsers } from '@/modules/users/domain';

const filters = ref<{
	search: string;
	isBlocked: boolean | undefined;
	sortBy: string;
	sortOrder: 'asc' | 'desc';
	limit: number;
	offset: number;
}>({
	search: '',
	isBlocked: undefined,
	sortBy: '',
	sortOrder: 'asc',
	limit: 20,
	offset: 0
});

const usersService = useUserService();
const fetchUsers = async () => {
	const params = { ...filters.value };

	if (params.isBlocked === undefined) {
		delete params.isBlocked;
	}
	await usersService.fetchUsers(params);
};

const editUser = (userId: number) => {
	router.push(`/users/${userId}`);
};
const dialog = ref<InstanceType<typeof UsersDialog> | null>(null);

const deleteUser = async (userId: number) => {
	dialog.value?.confirmAction(
		'Вы уверены, что хотите удалить пользователя?',
		async () => {
			await usersService.deleteUser(userId);
			await fetchUsers();
		}
	);
};

const toggleBlockStatus = async (userId: number, isBlocked: boolean) => {
	const message = isBlocked
		? 'Вы уверены, что хотите разблокировать пользователя?'
		: 'Вы уверены, что хотите заблокировать пользователя?';

	dialog.value?.confirmAction(message, async () => {
		if (isBlocked) {
			await usersService.unblockUser(userId);
		} else {
			await usersService.blockUser(userId);
		}
		await fetchUsers();
	});
};

const toggleAdminRole = async (userId: number, isAdmin: boolean) => {
	const message = isAdmin
		? 'Вы уверены, что хотите забрать права администратора?'
		: 'Вы уверены, что хотите дать права администратора?';

	dialog.value?.confirmAction(message, async () => {
		const roles = isAdmin ? [Roles.USER] : [Roles.USER, Roles.ADMIN];
		await usersService.updateUserRoles(userId, roles);
		await fetchUsers();
	});
};

const handleFiltersUpdate = (newFilters: Partial<NUsers.IUserFilters>) => {
	Object.assign(filters.value, newFilters);
	fetchUsers();
};

onMounted(fetchUsers);
</script>

<template>
	<div>
		<UsersFilter :filters="filters" @update:filters="handleFiltersUpdate" />
		<UsersTable
			:filters="{
				search: filters.search || '',
				sortBy: filters.sortBy || '',
				sortOrder: filters.sortOrder || 'desc',
				limit: filters.limit || 20,
				offset: filters.offset || 0,
				isBlocked: filters.isBlocked === undefined ? 'all' : filters.isBlocked
			}"
			:delete-user="deleteUser"
			:toggle-block-status="toggleBlockStatus"
			:toggle-admin-role="toggleAdminRole"
			:fetch-users="fetchUsers"
			:edit-user="editUser"
			@update:filters="handleFiltersUpdate"
		/>
		<UsersDialog ref="dialog" />
	</div>
</template>
