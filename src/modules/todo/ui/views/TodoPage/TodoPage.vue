<script setup lang="ts">
import { useTodoStore } from '@/modules/todo/infrastructure/stores';
import { TodoList } from '../../components/TodoList';
import { TodoFilter } from '../../components/TodoFilters';
import { AddTodoForm } from '../../components/AddTodoForm';
import { useTodoService } from '@/modules/todo/infrastructure/services';

const { fetchTodos } = useTodoService();
const todoStore = useTodoStore();

onMounted(async () => {
	await fetchTodos(todoStore.currentFilter);
});
</script>

<template>
	<h1 :class="$style.title">Todo List</h1>

	<AddTodoForm />

	<TodoFilter />

	<p v-if="todoStore.isLoading" :class="$style.loading">Загрузка...</p>

	<TodoList v-else />

	<p v-if="todoStore.error">{{ todoStore.error }}</p>
</template>

<style module lang="scss">
@use './styles/TodoPage.module.scss';
</style>
