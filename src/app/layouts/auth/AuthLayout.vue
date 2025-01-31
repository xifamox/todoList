<template>
	<v-app :class="$style.auth_container">
		<router-view :key="$route.fullPath" />
	</v-app>
</template>

<style module lang="scss">
@use './style/AuthLayout.module.scss';
</style>
