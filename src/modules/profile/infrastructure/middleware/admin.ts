import { RouterContext } from '@/app/router/types';
import { useProfileStore } from '../stores';

export default async function admin({ next }: RouterContext) {
	const profileStore = useProfileStore();

	if (!profileStore.isAdmin) {
		return next('/');
	}

	return next();
}
