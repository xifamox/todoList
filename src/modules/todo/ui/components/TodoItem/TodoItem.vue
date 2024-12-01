<script setup lang="ts">
import { useTodoService } from '@/modules/todo/infrastructure/services';
import { IconButton } from '../IconButton';

const props = defineProps({
	todo: {
		type: Object,
		required: true
	}
});

const { updateTodo, updateTodoStatus, deleteTodo } = useTodoService();

const isEditing = ref(false);
const currentTitle = ref(props.todo.title);
const completed = ref(props.todo.isDone);
const isError = ref(false);

const input = ref<HTMLInputElement>();

const validateAndSaveEdit = () => {
	if (!currentTitle.value.trim()) {
		isError.value = true;
		return;
	}

	isError.value = false;
	isEditing.value = false;

	if (currentTitle.value !== props.todo.title) {
		updateTodo(props.todo.id, {
			title: currentTitle.value,
			isDone: props.todo.isDone
		});
	}
};

const startEditing = async () => {
	isEditing.value = true;
	await nextTick(() => input.value?.focus());
};

const cancelEdit = () => {
	isEditing.value = false;
	currentTitle.value = props.todo.title;
	isError.value = false;
};

const handleKeyUp = (event: KeyboardEvent) => {
	if (event.key === 'Enter') {
		validateAndSaveEdit();
	}
};

const handleDelete = () => {
	deleteTodo(props.todo.id);
};

watch(
	() => completed.value,
	(newVal) => {
		updateTodoStatus(props.todo.id, newVal);
	}
);
</script>

<template>
	<div :class="$style.todoItem">
		<div :class="$style.todoItem__checkboxLabel">
			<input
				v-model="completed"
				type="checkbox"
				:disabled="isEditing"
				:class="$style.todoItem__checkbox"
			/>
			<template v-if="isEditing">
				<input
					ref="input"
					v-model="currentTitle"
					:class="[isError ? $style.errorInput : '', $style.todoItem__input]"
					@keyup="handleKeyUp"
				/>
			</template>
			<template v-else>
				<span
					:title="currentTitle"
					:class="[$style.todoItem__title, { [$style.completed]: completed }]"
					>{{ currentTitle }}</span
				>
			</template>
		</div>
		<div :class="$style.todoItem__action">
			<template v-if="isEditing">
				<IconButton
					type="access"
					icon="save.svg"
					label="Save"
					@click="validateAndSaveEdit"
				/>
				<IconButton
					type="warning"
					icon="cancel.svg"
					label="Cancel"
					@click="cancelEdit"
				/>
			</template>
			<template v-else>
				<IconButton
					type="primary"
					icon="edit.svg"
					label="Edit"
					@click="startEditing"
				/>
				<IconButton
					type="error"
					icon="delete.svg"
					label="Delete"
					@click="handleDelete"
				/>
			</template>
		</div>
	</div>
</template>

<style module lang="scss">
@use './styles/TodoItem.module.scss';
</style>
