export type TAuthFormState = {
    username: string;
    login: string;
    password: string;
    confirmPassword: string;
    email: string;
    phoneNumber?: string;
};
export declare const initialAuthFormState: TAuthFormState;
