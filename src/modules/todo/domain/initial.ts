import { NTodo } from './Domain';

export const initialTodoState: NTodo.IState = {
	todos: [],
	todoInfo: null,
	isLoading: false,
	error: null,
	currentFilter: 'all'
};
