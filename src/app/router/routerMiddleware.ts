import { NavigationGuardNext, Router } from 'vue-router';
import { RouterContext } from './types';

export const registerRouterMiddleware = (router: Router) => {
	router.beforeEach(async (to, from, next) => {
		try {
			if (!to.meta.middleware) return next();

			const middlewares = Array.isArray(to.meta.middleware)
				? to.meta.middleware
				: [to.meta.middleware];

			const context: RouterContext = { to, from, next };

			return middlewares[0]({
				...context,
				next: nextFactory(context, middlewares, 1)
			});
		} catch (error) {
			console.error('Error in middleware:', error);
			next(false);
		}
	});
};

function nextFactory(
	context: RouterContext,
	middlewares: Array<(context: RouterContext) => NavigationGuardNext>,
	index: number
): NavigationGuardNext {
	const nextMiddleware = middlewares[index];

	if (!nextMiddleware) return context.next;

	const nextPipeline = nextFactory(context, middlewares, index + 1);

	return nextMiddleware({ ...context, next: nextPipeline });
}
