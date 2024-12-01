import { RequestReturnValue } from '@/shared/types/api';
import { NProfile } from '../../domain';
import { ApiClient } from '@/shared/infrastructure/api';

export const useProfileModel = (): NProfile.IModel => {
	const getProfile = async (): Promise<
		RequestReturnValue<NProfile.IProfilePayload>
	> => {
		const response = await ApiClient.get<NProfile.IProfilePayload>(
			`/${NProfile.API_NAMESPACE}/profile`
		);
		return response;
	};

	return {
		getProfile
	};
};
