import { NAuth } from '../../domain';
export declare function useDetectUserService(): {
    handleLogin: (payload: NAuth.ILoginPayload) => Promise<boolean>;
    handleRegister: (payload: NAuth.IRegisterPayload) => Promise<boolean>;
};
