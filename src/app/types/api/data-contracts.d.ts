export interface GithubComSabbatDSrestApiInternalLibTodoConfigMeta {
    totalAmount?: number;
}
export interface GithubComSabbatDSrestApiInternalLibTodoConfigMetaResponse {
    data?: GithubComSabbatDSrestApiInternalLibTodoConfigTodo[];
    info?: GithubComSabbatDSrestApiInternalLibTodoConfigTodoInfo;
    meta?: GithubComSabbatDSrestApiInternalLibTodoConfigMeta;
}
export interface GithubComSabbatDSrestApiInternalLibTodoConfigTodo {
    created?: string;
    id?: number;
    isDone?: boolean;
    title?: string;
}
export interface GithubComSabbatDSrestApiInternalLibTodoConfigTodoInfo {
    all?: number;
    completed?: number;
    inWork?: number;
}
export interface GithubComSabbatDSrestApiInternalLibTodoConfigTodoRequest {
    isDone?: boolean;
    title?: string;
}
export interface GithubComSabbatDSrestApiInternalLibUserConfigAuthData {
    login: string;
    password: string;
}
export interface GithubComSabbatDSrestApiInternalLibUserConfigMeta {
    sortBy?: string;
    sortOrder?: string;
    totalAmount?: number;
}
export interface GithubComSabbatDSrestApiInternalLibUserConfigMetaResponse {
    data?: GithubComSabbatDSrestApiInternalLibUserConfigTableUser[];
    meta?: GithubComSabbatDSrestApiInternalLibUserConfigMeta;
}
export interface GithubComSabbatDSrestApiInternalLibUserConfigPutUser {
    email?: string;
    phoneNumber?: string;
    /**
     * @minLength 1
     * @maxLength 60
     */
    username?: string;
}
export interface GithubComSabbatDSrestApiInternalLibUserConfigPwd {
    /**
     * @minLength 6
     * @maxLength 60
     */
    password: string;
}
export interface GithubComSabbatDSrestApiInternalLibUserConfigTableUser {
    date?: string;
    email?: string;
    id?: number;
    isAdmin?: boolean;
    isBlocked?: boolean;
    phoneNumber?: string;
    username?: string;
}
export interface GithubComSabbatDSrestApiInternalLibUserConfigUser {
    email: string;
    /**
     * @minLength 2
     * @maxLength 60
     */
    login: string;
    /**
     * @minLength 6
     * @maxLength 60
     */
    password: string;
    phoneNumber?: string;
    /**
     * @minLength 1
     * @maxLength 60
     */
    username: string;
}
export interface InternalHttpServerHandlersAdminUpdateRequest {
    field?: string;
    value?: any;
}
export interface InternalHttpServerHandlersUserRefreshToken {
    refreshToken?: string;
}
export interface InternalHttpServerHandlersUserTokens {
    accessToken?: string;
    refreshToken?: string;
}
export interface UsersListParams {
    /** Filter users by username or email */
    search?: string;
    /** Sort by 'email', 'username', or 'id'. Default is 'id'. */
    sortBy?: string;
    /** Sort order: 'asc', 'desc', or 'none'. Default is 'asc'. */
    sortOrder?: string;
    /** Filter by block status (true/false) */
    isBlocked?: boolean;
    /** Limit the number of users returned (default is 20) */
    limit?: number;
    /** Offset for pagination (default is 0) */
    offset?: number;
}
export interface TodosListParams {
    /** Filter tasks by status: all, completed, or inWork */
    filter?: string;
}
