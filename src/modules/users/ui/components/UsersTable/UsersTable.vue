<script setup lang="ts">
import UsersActions from '../UsersActions/UsersActions.vue';
import { useUsersStore } from '@/modules/users/infrastructure/stores/useUsersStore';

const props = defineProps<{
	filters: {
		search: string;
		sortBy: string;
		sortOrder: 'asc' | 'desc';
		limit: number;
		offset: number;
		isBlocked: boolean | 'all';
	};
	fetchUsers: () => Promise<void>;
	deleteUser: (userId: number) => Promise<void>;
	toggleBlockStatus: (userId: number, isBlocked: boolean) => Promise<void>;
	toggleAdminRole: (userId: number, isAdmin: boolean) => Promise<void>;
	editUser: (userId: number) => void;
}>();

const emit = defineEmits<{
	(
		event: 'update:filters',
		value: { offset?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' }
	): void;
}>();

const usersStore = useUsersStore();

const users = computed(() => usersStore.users || []);
const total = computed(() => usersStore.meta.totalAmount || 0);
const isLoading = computed(() => usersStore.isLoading);

const headers = [
	{
		title: 'Имя пользователя',
		key: 'username',
		sortable: true,
		width: '200px'
	},
	{ title: 'Email', key: 'email', sortable: true, width: '240px' },
	{ title: 'Дата регистрации', key: 'date', sortable: false, width: '180px' },
	{ title: 'Заблокирован', key: 'isBlocked', sortable: false, width: '40px' },
	{ title: 'Роли', key: 'roles', sortable: false, width: '220px' },
	{
		title: 'Номер телефона',
		key: 'phoneNumber',
		sortable: false,
		width: '180px'
	}
];

const currentPage = computed(() => props.filters.offset + 1);

const handlePageChange = (page: number) => {
	emit('update:filters', {
		offset: page - 1
	});
};

const handleSort = (field: string) => {
	let sortBy = props.filters.sortBy;
	let sortOrder = props.filters.sortOrder;

	if (sortBy === field) {
		sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
	} else {
		sortBy = field;
		sortOrder = 'asc';
	}

	emit('update:filters', {
		sortBy,
		sortOrder
	});

	props.fetchUsers();
};
</script>

<template>
	<v-data-table-server
		v-if="users && users.length > 0"
		:page="currentPage"
		:items="users"
		:loading="isLoading"
		:headers="headers"
		:items-per-page="filters.limit"
		:items-length="total"
		:items-per-page-options="[20]"
		@update:page="handlePageChange"
	>
		<template #headers>
			<tr>
				<th
					v-for="header in headers"
					:key="header.key"
					:class="{
						'sortable-header': header.sortable,
						'sorted-header': header.key === filters.sortBy
					}"
					:style="{ width: header.width }"
					@click="header.sortable && handleSort(header.key)"
				>
					{{ header.title }}
					<span v-if="header.key === filters.sortBy">
						<v-icon small>
							{{
								header.key === filters.sortBy
									? filters.sortOrder === 'asc'
										? 'mdi-arrow-up'
										: 'mdi-arrow-down'
									: 'mdi-arrow-up-down'
							}}
						</v-icon>
					</span>
				</th>
			</tr>
		</template>
		<template #body="{ items }">
			<tr v-for="user in items" :key="user.id">
				<td>{{ user.username }}</td>
				<td>{{ user.email }}</td>
				<td>{{ new Date(user.date).toLocaleDateString() }}</td>
				<td>{{ user.isBlocked ? 'Да' : 'Нет' }}</td>
				<td>{{ user.roles.join(', ') }}</td>
				<td>{{ user.phoneNumber }}</td>
				<td>
					<UsersActions
						:user="user"
						@delete="deleteUser"
						@edit="editUser"
						@toggle-block="toggleBlockStatus"
						@toggle-admin="toggleAdminRole"
					/>
				</td>
			</tr>
		</template>
	</v-data-table-server>
	<p v-else>Нет данных для отображения</p>
</template>

<style scoped>
.sortable-header {
	cursor: pointer;
	user-select: none;
	gap: 8px;
}

.sorted-header {
	color: var(--v-primary-base);
	font-weight: bold;
}
</style>
