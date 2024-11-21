import { NTodo } from '../../domain';
export declare const useTodoService: () => {
    fetchTodos: (status: NTodo.TodoStatus) => Promise<void>;
    createTodo: (title: string) => Promise<void>;
    updateTodo: (id: number, payload: NTodo.ITodoRequest) => Promise<void>;
    updateTodoStatus: (id: number, isDone: boolean) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
};
