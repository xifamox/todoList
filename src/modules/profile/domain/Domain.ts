import { Profile } from '@/modules/auth/types/api';
import { IFetchState } from '@/shared/domain';
import { RequestReturnError, RequestReturnValue } from '@/shared/types/api';

export namespace NProfile {
	export const API_NAMESPACE = 'user';

	export interface IProfilePayload extends Profile {}

	export interface IModel {
		getProfile: () => Promise<RequestReturnValue<IProfilePayload>>;
	}

	export interface IState extends IFetchState {
		profile: IProfilePayload | null;
	}

	export interface IError extends RequestReturnError {}
}
