import { defineStore } from 'pinia';
import { initialProfileState } from '../../domain/initial';
import { NProfile } from '../../domain/Domain';
import { fetchStateInitialState } from '@/shared/domain';
import { Roles } from '@/modules/users/types';

export const useProfileStore = defineStore('profile', {
	state: (): NProfile.IState => ({
		...fetchStateInitialState,
		...initialProfileState
	}),
	getters: {
		isAdmin: (state: NProfile.IState) => state.profile?.roles || false
	},
	actions: {
		setProfile(profile: NProfile.IProfilePayload) {
			if (!profile) return;

			this.profile = profile;

			this.profile.roles = profile.roles || [];
		},
		hasRole(role: Roles): boolean {
			if (!this.profile) return false;
			return this.profile.roles.includes(role);
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
		setError(error: NProfile.IError | null) {
			this.error = error;
		}
	}
});
