import { NTodo } from '../../domain';
export declare const useTodoStore: import("pinia").StoreDefinition<"todo", NTodo.IState, {}, {
    setTodos(todos: NTodo.ITodo[]): void;
    setTodoInfo(todoInfo: NTodo.ITodoInfo | null): void;
    setIsLoading(value: boolean): void;
    setError(error: NTodo.IError | null): void;
    setCurrentFilter(filter: NTodo.TodoStatus): void;
}>;
