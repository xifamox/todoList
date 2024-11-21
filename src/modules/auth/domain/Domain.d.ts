import { AuthData, Profile, Token, UserRegistration } from '../types/api';
import { IFetchState } from '@/shared/domain';
import { RequestReturnError, RequestReturnValue } from '@/shared/types/api';
export declare namespace NAuth {
    const API_NAMESPACE = "auth";
    interface IUserProfile extends Profile {
    }
    interface ITokens extends Token {
    }
    interface IRegisterPayload extends UserRegistration {
    }
    interface ILoginPayload extends AuthData {
    }
    interface IState extends IFetchState {
        isAuthorization: boolean;
        accessToken: string | null;
        refreshToken: string | null;
        expireDate: number;
        fieldErrors: Record<string, string>;
        user: IUserProfile | null;
    }
    interface IModel {
        login: (payload: ILoginPayload) => Promise<RequestReturnValue<{
            user: IUserProfile;
            accessToken: string;
            refreshToken: string;
        }>>;
        register: (payload: IRegisterPayload) => Promise<RequestReturnValue<{
            user: IUserProfile;
            accessToken: string;
            refreshToken: string;
        }>>;
    }
    interface IError extends RequestReturnError {
    }
}
