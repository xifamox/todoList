<script setup lang="ts">
import { useTodoStore } from '@/modules/todo/infrastructure/stores';
import { TodoItem } from '../TodoItem';

const todoStore = useTodoStore();
</script>

<template>
	<div :class="$style.todoList">
		<TodoItem
			v-for="todo in todoStore.todos"
			:id="todo.id"
			:key="todo.id"
			:todo="todo"
		/>
	</div>
</template>

<style module lang="scss">
@use './styles/TodoList.module.scss';
</style>
