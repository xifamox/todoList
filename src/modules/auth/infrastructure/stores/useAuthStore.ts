import { defineStore } from 'pinia';
import { fetchStateInitialState } from '@/shared/domain';
import { NAuth } from '@/modules/auth/domain';
import { ApiClient } from '@/shared/infrastructure/api';
import { parseJwt } from '@/shared/utils/jwt';

export const useAuthStore = defineStore('auth', {
	persist: {
		paths: [
			'accessToken',
			'refreshToken',
			'expireDate',
			'isAuthorization',
			'user'
		]
	},
	state: (): NAuth.IState => ({
		...fetchStateInitialState,
		isAuthorization: false,
		accessToken: '',
		refreshToken: '',
		expireDate: 0,
		user: null,
		fieldErrors: {}
	}),
	getters: {
		isTokenExpired: (state: NAuth.IState) => Date.now() >= state.expireDate
	},
	actions: {
		setAuth(payload: Partial<NAuth.ITokens> & { user?: NAuth.IUserProfile }) {
			this.accessToken = payload.accessToken ?? null;
			this.refreshToken = payload.refreshToken ?? null;
			this.user = payload.user || null;

			if (this.accessToken) {
				const { exp } = parseJwt(this.accessToken);
				if (exp) {
					this.expireDate = exp * 1000;
					this.isAuthorization = true;
				}
			}
		},
		resetAuthState() {
			Object.assign(this, {
				isAuthorized: false,
				accessToken: null,
				refreshToken: null,
				expireDate: 0,
				user: null,
				fieldErrors: {}
			});
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

			try {
				const response = await ApiClient.post<NAuth.ITokens>(
					`${NAuth.API_NAMESPACE}/refresh`,
					{ refreshToken: this.refreshToken }
				);

				if (response.data) {
					this.setAuth(response.data);
				}
			} catch {
				this.resetAuthState();
				throw new Error('Failed to refresh tokens');
			}
		}
	}
});
