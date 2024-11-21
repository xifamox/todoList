import { TAuthFormState } from '@/modules/auth/domain';
export declare function useAuthForm(mode: string): {
    formData: globalThis.Ref<{
        username: string;
        login: string;
        password: string;
        confirmPassword: string;
        email: string;
        phoneNumber?: string | undefined;
    }, TAuthFormState | {
        username: string;
        login: string;
        password: string;
        confirmPassword: string;
        email: string;
        phoneNumber?: string | undefined;
    }>;
    errorMessage: globalThis.Ref<string | null, string | null>;
    handleSubmit: () => Promise<void>;
    isRegisterMode: globalThis.ComputedRef<boolean>;
    rules: {
        required: (value: string) => true | "Это поле обязательно";
        alphabetic: (min: number, max: number) => (value: string) => string | true;
        latin: (min: number, max: number) => (value: string) => string | true;
        alphanumeric: (min: number, max: number) => (value: string) => string | true;
        password: (min: number, max: number) => (value: string) => string | true;
        matchPassword: (value: string) => true | "Пароли не совпадают";
        email: (value: string) => true | "Введите корректный Email";
        phoneNumber: (value: string) => true | "Введите корректный номер телефона";
    };
    isLoading: globalThis.ComputedRef<boolean>;
};
