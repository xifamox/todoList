import { RouteRecordRaw } from 'vue-router';
import { AppRoutes } from './static';
import AuthLayout from '../layouts/auth/AuthLayout.vue';
import {
	authMiddleware,
	loginMiddleware
} from '@/modules/auth/infrastructure/middleware';
import MainLayout from '../layouts/main/MainLayout.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: AppRoutes.Todos,
		component: MainLayout,
		meta: { middleware: [authMiddleware] },
		children: [
			{
				path: '',
				name: AppRoutes.Todos,
				component: () =>
					import('@/modules/todo/ui/views/TodoPage/TodoPage.vue'),
				meta: { title: 'Todos' }
			},
			{
				path: '/profile',
				name: `${AppRoutes.Todos}-profile`,
				component: () =>
					import('@/modules/profile/ui/views/Profile/ProfilePage.vue'),
				meta: { title: 'Profile' }
			}
		]
	},
	{
		path: '/auth',
		name: AppRoutes.Auth,
		component: AuthLayout,
		meta: { middleware: [loginMiddleware] },
		children: [
			{
				path: 'login',
				name: AppRoutes.Auth,
				component: () =>
					import('@/modules/auth/ui/views/LoginPage/LoginPage.vue'),
				meta: { title: 'Login' }
			},
			{
				path: 'register',
				name: `${AppRoutes.Auth}-register`,
				component: () =>
					import('@/modules/auth/ui/views/RegisterPage/RegisterPage.vue'),
				meta: { title: 'Register' }
			}
		]
	},
	{
		path: '/:catchAll(.*)*',
		component: () => import('@/app/ui/views/NotFoundView/NotFoundView.vue'),
		meta: { title: 'Not Found' }
	}
];

export default routes;
