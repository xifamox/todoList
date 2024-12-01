<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/infrastructure/stores';
import { useProfileService } from '@/modules/profile/infrastructure/services';
import { useProfileStore } from '@/modules/profile/infrastructure/stores';
import { useRouter } from 'vue-router';

const router = useRouter();

const isSidebarExpanded = ref(false);

const toggleSidebar = () => {
	isSidebarExpanded.value = !unref(isSidebarExpanded);
};

const profileService = useProfileService();
const profileStore = useProfileStore();
const authStore = useAuthStore();

const sidebarItems = computed(() => [
	{
		title: 'Список задач',
		icon: 'mdi-format-list-bulleted',
		route: '/',
		action: null
	},
	{
		title: 'Личный кабинет',
		icon: 'mdi-account',
		route: '/profile',
		action: null
	},
	...(profileStore.isAdmin
		? [
				{
					title: 'Пользователи',
					icon: 'mdi-account-group',
					route: '/users',
					action: null
				}
		  ]
		: []),
	{
		title: 'Свернуть',
		icon: () =>
			isSidebarExpanded.value ? 'mdi-chevron-left' : 'mdi-chevron-right',
		route: null,
		action: toggleSidebar
	}
]);

const navigateTo = (route: string | null, action: (() => void) | null) => {
	if (route) {
		router.push(route);
	}
	if (action) {
		action();
	}
};

onMounted(async () => {
	if (authStore.isAuthorization) {
		await profileService.fetchProfile();
	}
});
</script>

<template>
	<v-navigation-drawer
		app
		:permanent="true"
		:width="isSidebarExpanded ? 240 : 56"
		class="sidebar"
	>
		<v-list>
			<v-list-item
				v-for="(item, index) in sidebarItems"
				:key="index"
				class="sidebar-item"
				:prepend-icon="
					typeof item.icon === 'function' ? item.icon() : item.icon
				"
				@click="navigateTo(item.route, item.action)"
			>
				<v-list-item-title v-if="isSidebarExpanded">{{
					item.title
				}}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<style module lang="scss">
@use './style/Sidebar.module.scss';
</style>
