<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useUserProfile } from './features/useUserProfilePage';

const route = useRoute();
const router = useRouter();
const userId = Number(route.params.id);

const { user, isEditing, errorMessage, fetchUser, saveChanges, toggleEdit } =
	useUserProfile(userId);

const goToUsersList = () => {
	router.push('/users');
};

onMounted(fetchUser);
</script>

<template>
	<div>
		<div class="header">
			<v-btn icon @click="goToUsersList">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<h1>Профиль пользователя</h1>
		</div>

		<div v-if="user" class="mt-4 d-flex justify-center flex-column">
			<v-text-field
				v-model="user.username"
				label="Имя пользователя"
				:disabled="!isEditing"
			/>
			<v-text-field v-model="user.email" label="Email" :disabled="!isEditing" />
			<v-text-field
				v-model="user.phoneNumber"
				label="Номер телефона"
				:disabled="!isEditing"
			/>

			<v-btn v-if="!isEditing" color="primary" @click="toggleEdit">
				Редактировать
			</v-btn>
			<v-btn v-if="isEditing" color="success" @click="() => saveChanges(user)">
				Сохранить
			</v-btn>

			<v-alert
				v-if="errorMessage"
				:icon="false"
				class="mt-4 text-center"
				type="error"
			>
				{{ errorMessage }}
			</v-alert>
		</div>
	</div>
</template>

<style scoped>
.header {
	display: flex;
	align-items: center;
	gap: 1rem;
}
</style>
