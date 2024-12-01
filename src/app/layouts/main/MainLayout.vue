<script setup lang="ts">
import { AppFooter, AppHeader, Sidebar } from '@/app/ui/components';
</script>

<template>
	<v-app>
		<Sidebar />
		<AppHeader />
		<v-main>
			<router-view />
		</v-main>
		<AppFooter />
	</v-app>
</template>
