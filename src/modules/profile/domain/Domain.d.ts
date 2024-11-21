import { Profile } from '@/modules/auth/types/api';
import { IFetchState } from '@/shared/domain';
import { RequestReturnError, RequestReturnValue } from '@/shared/types/api';
export declare namespace NProfile {
    const API_NAMESPACE = "user";
    interface IProfilePayload extends Profile {
    }
    interface IModel {
        getProfile: () => Promise<RequestReturnValue<IProfilePayload>>;
    }
    interface IState extends IFetchState {
        profile: IProfilePayload | null;
    }
    interface IError extends RequestReturnError {
    }
}
