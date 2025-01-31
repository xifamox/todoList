import { AuthData, Profile, Token, UserRegistration } from '../types/api';
import { IFetchState } from '@/shared/domain';
import { RequestReturnError, RequestReturnValue } from '@/shared/types/api';

export namespace NAuth {
	export const API_VERSION = 'v1';
	export const API_NAMESPACE = `${API_VERSION}/auth`;

	export interface IUserProfile extends Profile {}
	export interface ITokens extends Token {}
	export interface IRegisterPayload extends UserRegistration {}
	export interface ILoginPayload extends AuthData {}

	export interface IState extends IFetchState {
		isAuthorization: boolean;
		accessToken: string | null;
		refreshToken: string | null;
		expireDate: number;
		fieldErrors: Record<string, string>;
	}

	export interface IModel {
		login: (payload: ILoginPayload) => Promise<RequestReturnValue<ITokens>>;
		register: (payload: IRegisterPayload) => Promise<
			RequestReturnValue<{
				user: IUserProfile;
				accessToken: string;
			}>
		>;
	}

	export interface IError extends RequestReturnError {}
}
