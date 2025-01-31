import { RouterContext } from '@/app/router/types';
import { useAuthStore } from '../stores';
import { AppRoutes } from '@/app/router/static';

export default function login({ next }: RouterContext) {
	const authStore = useAuthStore();
	if (authStore.isAuthorization) {
		return next({ name: AppRoutes.Todos });
	}
	return next();
}
