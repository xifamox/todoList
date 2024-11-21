<script setup lang="ts">
import { NTodo } from '@/modules/todo/domain';
import { useTodoService } from '@/modules/todo/infrastructure/services';
import { useTodoStore } from '@/modules/todo/infrastructure/stores';

const { fetchTodos } = useTodoService();
const todoStore = useTodoStore();

const handleFilterChange = async (status: NTodo.TodoStatus) => {
	todoStore.setCurrentFilter(status);
	await fetchTodos(status);
};

const totalTodosCount = computed(() => todoStore.todoInfo?.all || 0);
const inWorkTodosCount = computed(() => todoStore.todoInfo?.inWork || 0);
const completedTodosCount = computed(() => todoStore.todoInfo?.completed || 0);
</script>

<template>
	<div :class="$style.todoList__nav">
		<button @click="handleFilterChange('all')">
			Все ({{ totalTodosCount }})
		</button>
		<button @click="handleFilterChange('inWork')">
			в работе ({{ inWorkTodosCount }})
		</button>
		<button @click="handleFilterChange('completed')">
			сделано ({{ completedTodosCount }})
		</button>
	</div>
</template>

<style module lang="scss">
@use './styles/TodoFilters.module.scss';
</style>
