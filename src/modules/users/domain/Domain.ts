import { IFetchState } from '@/shared/domain';
import {
	MetaResponse,
	User,
	UserFilters,
	UserRequest,
	UserRolesRequest
} from '../types';
import { RequestReturnError, RequestReturnValue } from '@/shared/types/api';

export namespace NUsers {
	export const API_VERSION = 'v1';
	export const API_NAMESPACE = `${API_VERSION}/admin/users`;

	export interface IUserFilters extends UserFilters {}
	export interface IUser extends User {}
	export interface IMetaResponse extends MetaResponse<IUser> {}
	export interface IUserUpdateRequest extends UserRequest {}

	export interface IState extends IFetchState {
		users: User[];
		meta: MetaResponse<User>['meta'];
	}

	export interface IModel {
		fetchUsers: (
			filters: IUserFilters
		) => Promise<RequestReturnValue<MetaResponse<IUser>>>;
		updateUser: (
			id: number,
			payload: IUserUpdateRequest
		) => Promise<RequestReturnValue<IUser>>;
		fetchUser: (id: number) => Promise<RequestReturnValue<IUser>>;
		updateRoles: (
			id: number,
			payload: UserRolesRequest
		) => Promise<RequestReturnValue<IUser>>;
		deleteUser: (id: number) => Promise<void>;
		blockUser: (id: number) => Promise<RequestReturnValue<IUser>>;
		unblockUser: (id: number) => Promise<RequestReturnValue<IUser>>;
	}

	export interface IError extends RequestReturnError {}
}
