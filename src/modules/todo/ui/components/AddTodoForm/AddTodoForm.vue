<script setup lang="ts">
import { useTodoService } from '@/modules/todo/infrastructure/services';

const newTaskTitle = ref<string>('');
const error = ref<boolean>(false);

const { createTodo } = useTodoService();

const createNewTodo = (newVal: string) => {
	if (!newVal) {
		error.value = true;
	} else {
		error.value = false;
		createTodo(newVal);
		newTaskTitle.value = '';
	}
};
</script>

<template>
	<form :class="$style.addTodo" @submit.prevent="createNewTodo(newTaskTitle)">
		<input
			v-model="newTaskTitle"
			type="text"
			:class="[error ? $style.errorInput : '', $style.addTodo__input]"
			placeholder="Task To Be Done..."
		/>
		<button type="submit" :class="$style.addTodo__btn">Add</button>
	</form>
</template>

<style module lang="scss">
@use './styles/AddTodoForm.module.scss';
</style>
