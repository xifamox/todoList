import { NUsers } from './Domain';

export const initialUserState: NUsers.IState = {
	users: [],
	meta: {
		totalAmount: 0,
		sortBy: '',
		sortOrder: 'asc'
	},
	isLoading: false,
	error: null
};
