import { NTodo } from '../../domain';
export declare const useTodoModel: () => {
    getTodos: (status: NTodo.TodoStatus) => Promise<import("../../../../shared/types/api").RequestReturnValue<NTodo.IMetaResponse>>;
    createTodo: (payload: NTodo.ITodoRequest) => Promise<import("../../../../shared/types/api").RequestReturnValue<NTodo.ITodo>>;
    updateTodo: (id: number, payload: NTodo.ITodoRequest) => Promise<import("../../../../shared/types/api").RequestReturnValue<NTodo.ITodo>>;
    updateTodoStatus: (id: number, isDone: boolean) => Promise<import("../../../../shared/types/api").RequestReturnValue<NTodo.ITodo>>;
    deleteTodo: (id: number) => Promise<import("../../../../shared/types/api").RequestReturnValue<void>>;
};
