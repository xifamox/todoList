export type TAuthFormState = {
	username: string;
	login: string;
	password: string;
	confirmPassword: string;
	email: string;
	phoneNumber?: string;
};

export const initialAuthFormState: TAuthFormState = {
	username: '',
	login: '',
	password: '',
	confirmPassword: '',
	email: '',
	phoneNumber: ''
};
