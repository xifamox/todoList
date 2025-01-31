import { RequestReturnError } from "../types/api"

export interface IFetchState<E = RequestReturnError> {
	isLoading: boolean
	error: E | null
}
