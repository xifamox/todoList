import { RouterContext } from '@/app/router/types';
import { useAuthStore } from '../stores';
import { AppRoutes } from '@/app/router/static';

export default async function auth({ next }: RouterContext) {
	const authStore = useAuthStore();

	try {
		if (!authStore.refreshToken) {
			authStore.resetAuthState();
			return next({ name: AppRoutes.Auth });
		}
		await authStore.verifyAuthorization();
		return next();
	} catch {
		authStore.resetAuthState();
		return next({
			name: AppRoutes.Auth
		});
	}
}
