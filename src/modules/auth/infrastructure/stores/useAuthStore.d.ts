import { NAuth } from '@/modules/auth/domain';
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", NAuth.IState, {
    isTokenExpired: (state: NAuth.IState) => boolean;
}, {
    setAuth(payload: Partial<NAuth.ITokens> & {
        user?: NAuth.IUserProfile;
    }): void;
    resetAuthState(): void;
    setIsLoading(value: boolean): void;
    setError(error: NAuth.IError | null): void;
    verifyAuthorization(): Promise<void>;
    refreshTokens(): Promise<void>;
}>;
