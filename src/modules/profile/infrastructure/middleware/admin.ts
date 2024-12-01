import { RouterContext } from '@/app/router/types';
import { useProfileStore } from '../stores';

export default async function admin({ next, to }: RouterContext) {
	const profileStore = useProfileStore();

	console.log('adminMiddleware: Checking admin rights for route:', to.path);

	if (!profileStore.isAdmin) {
		console.log('adminMiddleware: Access denied, redirecting to home.');
		return next('/');
	}

	console.log('adminMiddleware: Admin access granted.');
	return next();
}
