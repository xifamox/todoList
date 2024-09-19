<script setup lang="ts">
	import ActionButton from "../ActionButton/ActionButton.vue"

	const props = defineProps({
		title: String,
		isCompleted: Boolean,
	})

	const completed = props.isCompleted

	const editTodo = () => {
		console.log("edit")
	}

	const deleteTodo = () => {
		console.log("delete")
	}
</script>

<template>
	<div :class="$style.todoItem">
		<div :class="$style.todoItem__checkboxLabel">
			<input
				type="checkbox"
				v-model="completed"
				:class="$style.todoItem__checkbox"
			/>
			<span ::class="{ completed: completed }">{{ title }}</span>
		</div>
		<div :class="$style.todoItem__action">
			<ActionButton type="edit" @edit="editTodo" />
			<ActionButton type="delete" @delete="deleteTodo" />
		</div>
	</div>
</template>

<style module lang="scss">
	@import "./styles/TodoItem.module.scss";
</style>
