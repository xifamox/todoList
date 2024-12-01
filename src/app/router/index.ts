import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { registerRouterMiddleware } from './routerMiddleware';

const router = createRouter({
	history: createWebHistory(),
	routes
});

registerRouterMiddleware(router);

export default router;
