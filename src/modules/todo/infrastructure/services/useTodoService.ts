import { NTodo } from '../../domain';
import { useTodoModel } from '../models';
import { useTodoStore } from '../stores';

export const useTodoService = () => {
	const todoStore = useTodoStore();
	const todoModel = useTodoModel();

	const fetchTodos = async (status: NTodo.TodoStatus) => {
		todoStore.setIsLoading(true);
		try {
			const response = await todoModel.getTodos(status);
			if (response.data) {
				todoStore.setTodos(response.data.data);
				todoStore.setTodoInfo(response.data.info || null);
			}
		} catch (error) {
			todoStore.setError(error as NTodo.IError);
		} finally {
			todoStore.setIsLoading(false);
		}
	};
	const createTodo = async (title: string) => {
		try {
			await todoModel.createTodo({ title, isDone: false });
			await fetchTodos(todoStore.currentFilter);
		} catch (error) {
			todoStore.setError(error as NTodo.IError);
		}
	};
	const updateTodo = async (id: number, payload: NTodo.ITodoRequest) => {
		try {
			await todoModel.updateTodo(id, payload);
			await fetchTodos(todoStore.currentFilter);
		} catch (error) {
			todoStore.setError(error as NTodo.IError);
		}
	};
	const updateTodoStatus = async (id: number, isDone: boolean) => {
		try {
			await todoModel.updateTodoStatus(id, isDone);
			await fetchTodos(todoStore.currentFilter);
		} catch (error) {
			todoStore.setError(error as NTodo.IError);
		}
	};
	const deleteTodo = async (id: number) => {
		try {
			await todoModel.deleteTodo(id);
			await fetchTodos(todoStore.currentFilter);
		} catch (error) {
			todoStore.setError(error as NTodo.IError);
		}
	};
	return { fetchTodos, createTodo, updateTodo, updateTodoStatus, deleteTodo };
};
