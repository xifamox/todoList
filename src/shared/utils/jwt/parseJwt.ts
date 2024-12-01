import { jwtDecode } from 'jwt-decode';

export const parseJwt = (token: any) => {
	const decoded = jwtDecode(token);

	return decoded;
};
