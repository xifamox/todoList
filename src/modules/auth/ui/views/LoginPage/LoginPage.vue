<script setup lang="ts">
import router from '@/app/router';
import AuthForm from '../../components/AuthForm/AuthForm.vue';

const onRegisterClick = () => router.push('/auth/register');
</script>

<template>
	<div>
		<AuthForm />
	</div>
	<v-btn variant="text" class="mt-4" @click="onRegisterClick"
		>Зарегистрироваться</v-btn
	>
</template>
