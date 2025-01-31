import { defineStore } from 'pinia';
import { initialTodoState, NTodo } from '../../domain';

export const useTodoStore = defineStore('todo', {
	state: (): NTodo.IState => ({
		...initialTodoState
	}),
	actions: {
		setTodos(todos: NTodo.ITodo[]) {
			this.todos = todos;
		},
		setTodoInfo(todoInfo: NTodo.ITodoInfo | null) {
			this.todoInfo = todoInfo;
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
		setError(error: NTodo.IError | null) {
			this.error = error;
		},
		setCurrentFilter(filter: NTodo.TodoStatus) {
			this.currentFilter = filter;
		}
	}
});
