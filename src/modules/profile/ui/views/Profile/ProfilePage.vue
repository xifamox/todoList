<script setup lang="ts">
import router from '@/app/router';
import { AppRoutes } from '@/app/router/static';
import { useAuthStore } from '@/modules/auth/infrastructure/stores';
import { useProfileService } from '@/modules/profile/infrastructure/services';
import { useProfileStore } from '@/modules/profile/infrastructure/stores';
import { onMounted } from 'vue';

const profileStore = useProfileStore();
const { resetAuthState } = useAuthStore();
const { fetchProfile } = useProfileService();

const logout = () => {
	resetAuthState();
	router.push({ name: `${AppRoutes.Auth}` });
};

onMounted(async () => {
	await fetchProfile();
});
</script>

<template>
	<div class="profile-page">
		<div v-if="profileStore.isLoading">Загрузка...</div>
		<div v-else-if="profileStore.error" class="error">
			{{ profileStore.error }}
		</div>
		<div v-else-if="profileStore.profile" class="profile">
			<h1>Личный кабинет</h1>
			<p>
				<strong>Имя пользователя:</strong> {{ profileStore.profile.username }}
			</p>
			<p><strong>Почтовый адрес:</strong> {{ profileStore.profile.email }}</p>
			<p v-if="profileStore.profile.phoneNumber">
				<strong>Телефон:</strong> {{ profileStore.profile.phoneNumber }}
			</p>
		</div>
	</div>
	<v-btn @click="logout">Выйти</v-btn>
</template>

<style scoped>
.profile-page {
	padding: 1rem;
}
.error {
	color: red;
}
</style>
