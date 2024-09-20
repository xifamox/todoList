import { ref } from "vue"
import { getTodos } from "../services/todoService"
import { Todo, TodoInfo, TodoStatus } from "../types/todo"

export const useTodos = () => {
	const todos = ref<Todo[]>([])
	const todoInfo = ref<TodoInfo | null>(null)
	const isLoading = ref(false)
	const error = ref<string | null>(null)

	const fetchTodos = async (status: TodoStatus = "all") => {
		isLoading.value = true
		try {
			const response = await getTodos(status)
			todos.value = response?.data || []
			todoInfo.value = response?.info || null
		} catch (err) {
			error.value = err instanceof Error ? err.message : "Unknown error"
		} finally {
			isLoading.value = false
		}
	}

	return {
		todos,
		todoInfo,
		isLoading,
		error,
		fetchTodos,
	}
}
