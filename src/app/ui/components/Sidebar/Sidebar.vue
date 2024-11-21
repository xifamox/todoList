<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const isSidebarExpanded = ref(false);

const navigateTo = (route: string) => {
	router.push(route);
};

const toggleSidebar = () => {
	isSidebarExpanded.value = !unref(isSidebarExpanded);
};
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
				class="sidebar-item d-flex"
				prepend-icon="mdi-format-list-bulleted"
				@click="navigateTo('/')"
			>
				<v-list-item-title v-if="isSidebarExpanded"
					>Список задач</v-list-item-title
				>
			</v-list-item>

			<v-list-item
				class="sidebar-item"
				prepend-icon="mdi-account"
				@click="navigateTo('/profile')"
			>
				<v-list-item-title v-if="isSidebarExpanded"
					>Личный кабинет</v-list-item-title
				>
			</v-list-item>

			<v-list-item
				class="sidebar-item"
				:prepend-icon="
					isSidebarExpanded ? 'mdi-chevron-left' : 'mdi-chevron-right'
				"
				@click="toggleSidebar"
			>
				<v-list-item-title v-if="isSidebarExpanded">Свернуть</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<style module lang="scss">
@use './style/Sidebar.module.scss';
</style>
