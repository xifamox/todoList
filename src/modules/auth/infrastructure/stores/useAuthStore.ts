import { defineStore } from 'pinia';
import { fetchStateInitialState } from '@/shared/domain';
import { NAuth } from '@/modules/auth/domain';
import { ApiClient } from '@/shared/infrastructure/api';
import { parseJwt } from '@/shared/utils/jwt';

export const useAuthStore = defineStore('auth', {
	persist: {
		paths: ['accessToken', 'refreshToken', 'expireDate', 'isAuthorization']
	},
	state: (): NAuth.IState => ({
		...fetchStateInitialState,
		isAuthorization: false,
		accessToken: '',
		refreshToken: '',
		expireDate: 0,
		fieldErrors: {}
	}),
	getters: {
		isTokenExpired: (state: NAuth.IState) => Date.now() >= state.expireDate
	},
	actions: {
		async setAuth(payload: Partial<NAuth.ITokens>) {
			this.accessToken = payload.accessToken ?? null;
			this.refreshToken = payload.refreshToken ?? null;

			if (this.accessToken) {
				const { exp } = parseJwt(this.accessToken);
				if (exp) {
					this.expireDate = exp * 1000;
					this.isAuthorization = true;
				}
			}
		},
		resetAuthState() {
			this.isAuthorization = false;
			this.accessToken = '';
			this.refreshToken = '';
			this.expireDate = 0;
		},
		setIsLoading(value: boolean) {
			this.isLoading = value;
		},
		setError(error: NAuth.IError | null) {
			this.error = error;
		},
		async verifyAuthorization() {
			if (this.isTokenExpired) {
				await this.refreshTokens();
			}
			if (!this.accessToken) {
				throw new Error('Unauthorized');
			}
		},
		async refreshTokens() {
			if (!this.refreshToken) {
				this.resetAuthState();
				throw new Error('Refresh token is missing.');
			}

			this.setIsLoading(true);

			try {
				if (!this.isLoading) {
					const response = await ApiClient.post<NAuth.ITokens>(
						`${NAuth.API_NAMESPACE}/refresh`,
						{ refreshToken: this.refreshToken }
					);
					if (response.data) {
						this.setAuth(response.data);
					}
				}
			} catch {
				this.resetAuthState();
				throw new Error('Failed to refresh tokens');
			} finally {
				this.isLoading = false;
			}
		}
	}
});
