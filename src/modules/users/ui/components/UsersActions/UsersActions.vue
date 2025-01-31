<script setup lang="ts">
import { Roles } from '@/modules/users/types';

defineProps<{
	user: {
		id: number;
		username: string;
		email: string;
		date: string;
		isBlocked: boolean;
		roles: Roles[];
		phoneNumber: string;
	};
}>();

defineEmits<{
	(event: 'delete', userId: number): void;
	(event: 'toggleBlock', userId: number, isBlocked: boolean): void;
	(event: 'toggleAdmin', userId: number, isAdmin: boolean): void;
	(event: 'edit', userId: number): void;
}>();
</script>

<template>
	<div class="action-buttons">
		<v-btn color="primary" outlined @click="$emit('edit', user.id)">
			<v-icon>mdi-pencil</v-icon>
		</v-btn>
		<v-btn color="error" outlined @click="$emit('delete', user.id)">
			<v-icon>mdi-delete</v-icon>
		</v-btn>
		<v-btn
			color="warning"
			outlined
			@click="$emit('toggleBlock', user.id, user.isBlocked)"
		>
			<v-icon>{{ user.isBlocked ? 'mdi-lock-open' : 'mdi-lock' }}</v-icon>
		</v-btn>
		<v-btn
			color="success"
			outlined
			@click="$emit('toggleAdmin', user.id, user.roles.includes(Roles.ADMIN))"
		>
			<v-icon>
				{{
					user.roles.includes(Roles.ADMIN)
						? 'mdi-account-remove'
						: 'mdi-account-plus'
				}}
			</v-icon>
		</v-btn>
	</div>
</template>

<style scoped>
.action-buttons {
	display: flex;
	gap: 8px;
	align-items: center;
	text-align: center;
}
</style>
