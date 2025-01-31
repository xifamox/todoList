import { NavigationGuardNext, Router } from 'vue-router';

import { RouterContext } from './types';

export const registerRouterMiddleware = (router: Router) => {
	router.beforeEach((to, from, next) => {
		if (!to.meta.middleware) {
			return next();
		}

		const middlewares = Array.isArray(to.meta.middleware)
			? to.meta.middleware
			: [to.meta.middleware];

		const context = {
			to,
			from,

			next,
			router
		};

		return middlewares[0]({
			...context,
			next: nextFactory(context, middlewares, 1)
		});
	});
};

function nextFactory(
	context: RouterContext,
	middlewares: Array<(context: RouterContext) => NavigationGuardNext>,
	index: number
): NavigationGuardNext {
	const nextMiddleware = middlewares[index];

	if (!nextMiddleware) {
		return context.next;
	}

	const nextPipeline = nextFactory(context, middlewares, index + 1);

	return nextMiddleware({ ...context, next: nextPipeline });
}
