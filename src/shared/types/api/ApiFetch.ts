export interface RequestReturnError {
	message: string;
	statusCode: number;
}

export interface RequestReturnValue<T> {
	data: T | null;
	error: RequestReturnError | null;
	statusCode: number;
}
