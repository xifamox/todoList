import { RouterContext } from '@/app/router/types';
import { useAuthStore } from '../stores';
import { AppRoutes } from '@/app/router/static';

export default function login({ next }: RouterContext) {
	const authStore = useAuthStore();
	console.log('loginMiddleware: Checking if user is logged in...');
	if (authStore.isAuthorization) {
		console.log('loginMiddleware: User is authorized, redirecting to Todos...');
		return next({ name: AppRoutes.Todos });
	}
	console.log(
		'loginMiddleware: User not authorized, continuing to login/register...'
	);
	return next();
}
