import { ApiClient } from '@/shared/infrastructure/api';
import { NTodo } from '../../domain';

export const useTodoModel = () => {
	const getTodos = async (status: NTodo.TodoStatus) =>
		ApiClient.get<NTodo.IMetaResponse>(
			`/${NTodo.API_NAMESPACE}?filter=${status}`
		);

	const createTodo = async (payload: NTodo.ITodoRequest) =>
		ApiClient.post<NTodo.ITodo>(`/${NTodo.API_NAMESPACE}`, payload);

	const updateTodo = async (id: number, payload: NTodo.ITodoRequest) =>
		ApiClient.put<NTodo.ITodo>(`/${NTodo.API_NAMESPACE}/${id}`, payload);

	const updateTodoStatus = async (id: number, isDone: boolean) =>
		ApiClient.put<NTodo.ITodo>(`${NTodo.API_NAMESPACE}/${id}`, {
			isDone
		});

	const deleteTodo = async (id: number) =>
		ApiClient.delete<void>(`${NTodo.API_NAMESPACE}/${id}`);

	return {
		getTodos,
		createTodo,
		updateTodo,
		updateTodoStatus,
		deleteTodo
	};
};
