import { defineStore } from 'pinia';
import { initialProfileState } from '../../domain/initial';
import { NProfile } from '../../domain/Domain';
import { fetchStateInitialState } from '@/shared/domain';

export const useProfileStore = defineStore('profile', {
	state: (): NProfile.IState => ({
		...fetchStateInitialState,
		...initialProfileState
	}),
	actions: {
		setProfile(profile: NProfile.IProfilePayload) {
			this.profile = profile;
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
		setError(error: NProfile.IError | null) {
			this.error = error;
		}
	}
});
