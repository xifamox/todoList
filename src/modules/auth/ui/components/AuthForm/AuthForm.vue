<script setup lang="ts">
import { useAuthForm } from '../../components/AuthForm/features';

const props = defineProps({
	mode: {
		type: String,
		default: 'login'
	}
});

const {
	formData,
	errorMessage,
	handleSubmit,
	isRegisterMode,
	isLoading,
	rules
} = useAuthForm(props.mode);
</script>

<template>
	<v-form
		class="d-flex flex-column justify-lg-center"
		@submit.prevent="handleSubmit"
	>
		<v-text-field
			v-model="formData.username"
			label="Имя пользователя"
			:rules="[rules.required, rules.alphabetic, rules.length(1, 60)]"
			required
		/>
		<v-text-field
			v-model="formData.login"
			label="Логин"
			:rules="[rules.required, rules.latin, rules.length(2, 60)]"
			required
		/>
		<v-text-field
			v-model="formData.password"
			label="Пароль"
			type="password"
			:rules="[rules.required, rules.length(6, 60)]"
			required
		/>
		<v-text-field
			v-if="isRegisterMode"
			v-model="formData.confirmPassword"
			label="Подтвердите пароль"
			type="password"
			:rules="[rules.required, rules.matchPassword]"
			required
		/>
		<v-text-field
			v-if="isRegisterMode"
			v-model="formData.email"
			label="Email"
			type="email"
			:rules="[rules.required, rules.email]"
			required
		/>
		<v-text-field
			v-if="isRegisterMode"
			v-model="formData.phoneNumber"
			label="Номер телефона"
			type="tel"
			:rules="[rules.phoneNumber]"
		/>
		<v-btn type="submit" color="primary" :loading="isLoading">
			{{ isRegisterMode ? 'Зарегистрироваться' : 'Войти' }}
		</v-btn>
		<v-alert
			v-if="errorMessage"
			:icon="false"
			class="mt-4 text-center"
			type="error"
		>
			{{ errorMessage }}
		</v-alert>
	</v-form>
</template>
