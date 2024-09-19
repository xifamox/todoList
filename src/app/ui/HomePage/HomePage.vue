<script setup lang="ts">
	import TodoItem from "../../components/TodoItem/TodoItem.vue"

	const todos = [
		{
			title: "text",
			isCompleted: false,
		},
		{
			title: "text2",
			isCompleted: false,
		},
	]
</script>

<template>
	<h1 :class="$style.title">Todo List</h1>
	<div :class="$style.addTodo">
		<input
			type="text"
			:class="$style.addTodo__input"
			placeholder="Task To Be Done..."
		/>
		<button :class="$style.addTodo__btn">Add</button>
	</div>
	<div :class="$style.todoList">
		<div :class="$style.todoList__nav">
			<p>Все ({{ todos.length }})</p>
			<p>в работе (2)</p>
			<p>сделано (3)</p>
		</div>
		<TodoItem
			v-for="todo in todos"
			:title="todo.title"
			:is-completed="todo.isCompleted"
		/>
	</div>
</template>

<style module lang="scss">
	@import "./styles/HomePage.module.scss";
</style>
