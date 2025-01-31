import { IFetchState } from '@/shared/domain';
import { Todo, TodoInfo, TodoRequest, MetaResponse } from '../types/api';
import { RequestReturnError } from '@/shared/types/api';

export namespace NTodo {
	export const API_VERSION = 'v1';
	export const API_NAMESPACE = `${API_VERSION}/todos`;

	export interface ITodo extends Todo {}
	export interface ITodoInfo extends TodoInfo {}
	export interface ITodoRequest extends TodoRequest {}
	export interface IMetaResponse extends MetaResponse<ITodo, ITodoInfo> {}

	export type TodoStatus = 'all' | 'completed' | 'inWork';

	export interface IState extends IFetchState {
		todos: ITodo[];
		todoInfo: ITodoInfo | null;
		currentFilter: TodoStatus;
	}

	export interface IError extends RequestReturnError {}
}
