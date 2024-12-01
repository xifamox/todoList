import { initialAuthFormState, TAuthFormState } from '@/modules/auth/domain';
import { useDetectUserService } from '@/modules/auth/infrastructure/services';
import { useAuthStore } from '@/modules/auth/infrastructure/stores';
import { useRouter } from 'vue-router';

export function useAuthForm(mode: string) {
	const isRegisterMode = computed(() => mode === 'register');
	const { handleLogin, handleRegister } = useDetectUserService();
	const authStore = useAuthStore();
	const router = useRouter();

	const formData = ref<TAuthFormState>({ ...initialAuthFormState });
	const errorMessage = ref<string | null>(null);
	const isLoading = computed(() => authStore.isLoading);

	const rules = {
		required: (value: string) => !!value || 'Это поле обязательно',
		alphabetic: (value: string) =>
			/^[a-zA-Zа-яА-Я]+$/.test(value) || 'Только буквы',
		latin: (value: string) =>
			/^[a-zA-Z]+$/.test(value) || 'Только латинские буквы',
		alphanumeric: (value: string) =>
			/^[a-zA-Z]+$/.test(value) || 'Только латинские буквы',
		email: (value: string) =>
			/\S+@\S+\.\S+/.test(value) || 'Введите корректный Email',
		phoneNumber: (value: string) =>
			/^(\+?\d{10,15})?$/.test(value) || 'Введите корректный номер телефона',
		length: (min: number, max: number) => (value: string) =>
			(value.length >= min && value.length <= max) ||
			`Длина должна быть от ${min} до ${max} символов`,
		matchPassword: (value: string) =>
			value === formData.value.password || 'Пароли не совпадают'
	};

	const validationKeys: Partial<
		Record<keyof TAuthFormState, Array<(value: string) => string | true>>
	> = {
		username: [rules.required, rules.alphabetic, rules.length(1, 60)],
		login: [rules.required, rules.alphanumeric, rules.length(2, 60)],
		password: [rules.required, rules.length(6, 60)],
		...(isRegisterMode.value && {
			confirmPassword: [rules.required, rules.matchPassword],
			email: [rules.required, rules.email],
			phoneNumber: [rules.phoneNumber]
		})
	};

	const validateForm = (): boolean => {
		errorMessage.value = null;

		for (const key in validationKeys) {
			const fieldRules = validationKeys[key as keyof TAuthFormState];
			const value = formData.value[key as keyof TAuthFormState] ?? '';

			if (fieldRules) {
				for (const rule of fieldRules) {
					const result = rule(value);
					if (typeof result === 'string') {
						errorMessage.value = result;
						return false;
					}
				}
			}
		}

		return true;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		const submitAction = isRegisterMode.value ? handleRegister : handleLogin;

		const success = await submitAction(formData.value);
		if (success) {
			router.push(isRegisterMode.value ? '/auth/login' : '/');
		} else {
			const error = authStore.error;
			errorMessage.value =
				typeof error?.message === 'string'
					? error.message
					: 'Неизвестная ошибка';
		}
	};

	return {
		formData,
		errorMessage,
		handleSubmit,
		isRegisterMode,
		rules,
		isLoading
	};
}
