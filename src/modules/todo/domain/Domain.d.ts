import { IFetchState } from '@/shared/domain';
import { Todo, TodoInfo, TodoRequest, MetaResponse } from '../types/api';
import { RequestReturnError } from '@/shared/types/api';
export declare namespace NTodo {
    const API_NAMESPACE = "todos";
    interface ITodo extends Todo {
    }
    interface ITodoInfo extends TodoInfo {
    }
    interface ITodoRequest extends TodoRequest {
    }
    interface IMetaResponse extends MetaResponse<ITodo, ITodoInfo> {
    }
    type TodoStatus = 'all' | 'completed' | 'inWork';
    interface IState extends IFetchState {
        todos: ITodo[];
        todoInfo: ITodoInfo | null;
        currentFilter: TodoStatus;
    }
    interface IError extends RequestReturnError {
    }
}
