<script setup lang="ts">
import router from '@/app/router';
import AuthForm from '../../components/AuthForm/AuthForm.vue';

const onLoginClick = () => router.push('/auth/login');
</script>

<template>
	<div>
		<AuthForm mode="register" />
	</div>
	<v-btn variant="text" class="mt-4" @click="onLoginClick">Войти</v-btn>
</template>
