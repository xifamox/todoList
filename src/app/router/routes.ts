import { RouteRecordRaw } from 'vue-router';
import { AppRoutes } from './static';
import AuthLayout from '../layouts/auth/AuthLayout.vue';
import MainLayout from '../layouts/main/MainLayout.vue';
import {
	authMiddleware,
	loginMiddleware
} from '@/modules/auth/infrastructure/middleware';
import { adminMiddleware } from '@/modules/profile/infrastructure/middleware';

const componentMap = {
	todoPage: () => import('@/modules/todo/ui/views/TodoPage/TodoPage.vue'),
	profilePage: () =>
		import('@/modules/profile/ui/views/Profile/ProfilePage.vue'),
	usersPage: () => import('@/modules/users/ui/views/UsersPage/UsersPage.vue'),
	loginPage: () => import('@/modules/auth/ui/views/LoginPage/LoginPage.vue'),
	registerPage: () =>
		import('@/modules/auth/ui/views/RegisterPage/RegisterPage.vue'),
	notFoundPage: () => import('@/app/ui/views/NotFoundView/NotFoundView.vue')
};

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
				component: componentMap.todoPage
			},
			{
				path: '/profile',
				name: `${AppRoutes.Todos}-profile`,
				component: componentMap.profilePage
			},
			{
				path: '/users',
				name: `${AppRoutes.Todos}-users`,
				component: componentMap.usersPage,
				meta: {
					requiresAdmin: true,
					middleware: [authMiddleware, adminMiddleware]
				}
			},
			{
				path: '/users/:id',
				name: 'UserProfile',
				component: () =>
					import(
						'@/modules/users/ui/views/UserProfilePage/UserProfilePage.vue'
					),
				meta: {
					requiresAdmin: true,
					middleware: [authMiddleware, adminMiddleware]
				}
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
				component: componentMap.loginPage
			},
			{
				path: 'register',
				name: `${AppRoutes.Auth}-register`,
				component: componentMap.registerPage
			}
		]
	},
	{
		path: '/:catchAll(.*)*',
		component: componentMap.notFoundPage
	}
];

export default routes;
