import { NProfile } from '../../domain';
import { useProfileModel } from '../models';
import { useProfileStore } from '../stores/useProfileStore';

export function useProfileService() {
	const profileStore = useProfileStore();
	const { getProfile } = useProfileModel();

	const fetchProfile = async () => {
		profileStore.setIsLoading(true);
		profileStore.setError(null);

		try {
			const response = await getProfile();
			if (response.data) {
				profileStore.setProfile(response.data);
				return true;
			} else {
				profileStore.setError(response.error);
				return false;
			}
		} catch (error) {
			profileStore.setError(error as NProfile.IError | null);
			return false;
		} finally {
			profileStore.setIsLoading(false);
		}
	};

	return { fetchProfile };
}
