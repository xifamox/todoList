import { RouterContext } from '@/app/router/types';
import { useAuthStore } from '../stores';
import { AppRoutes } from '@/app/router/static';

export default function login({ next }: RouterContext) {
	const { isAuthorization } = useAuthStore();

	if (isAuthorization) {
		return next({
			name: AppRoutes.Todos
		});
	}

	return next();
}
