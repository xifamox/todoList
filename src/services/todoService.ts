import { MetaResponse, Todo, TodoInfo, TodoStatus } from "../types/todo"
import { useFetch } from "@vueuse/core"

const BASE_URL = "http://51.250.113.72:8082/api/v1/todos"

export const getTodos = async (status: TodoStatus = "all") => {
	const { data, error } = await useFetch<MetaResponse<Todo, TodoInfo>>(
		`${BASE_URL}?filter=${status}`
	)
		.get()
		.json()

	if (error.value) {
		throw new Error(`Error fetching todos: ${error.value}`)
	}

	return data.value
}
