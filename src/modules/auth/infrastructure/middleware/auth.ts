import { RouterContext } from '@/app/router/types';
import { useAuthStore } from '@/modules/auth/infrastructure/stores';

export default async function authMiddleware({ next }: RouterContext) {
	const authStore = useAuthStore();

	if (!authStore.isAuthorization) {
		return next('/auth/login');
	}

	next();
}
