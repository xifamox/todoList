import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { registerRouterMiddleware } from './routerMiddleware';

const router = createRouter({
	history: createWebHistory(),
	routes
});

registerRouterMiddleware(router);

router.beforeEach((to) => {
	const title = to.meta?.title;
	if (title) document.title = `EasyDev - ${title}`;
});

export default router;
