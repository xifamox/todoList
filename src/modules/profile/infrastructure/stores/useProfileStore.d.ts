import { NProfile } from '../../domain/Domain';
export declare const useProfileStore: import("pinia").StoreDefinition<"profile", NProfile.IState, {}, {
    setProfile(profile: NProfile.IProfilePayload): void;
    setIsLoading(value: boolean): void;
    setError(error: NProfile.IError | null): void;
}>;
