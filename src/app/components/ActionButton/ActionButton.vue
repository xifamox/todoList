<script setup lang="ts">
	import { computed } from "vue"
	import styles from "./styles/ActionButton.module.scss"

	const props = defineProps({
		type: {
			type: String,
			required: true,
			validator: (value: string) => ["edit", "delete"].includes(value),
		},
	})

	const emit = defineEmits(["edit", "delete"])

	const buttonClass = computed(() =>
		props.type === "edit" ? styles.editButton : styles.deleteButton
	)

	const emitAction = () => {
		emit(props.type === "edit" ? "edit" : "delete")
	}
</script>

<template>
	<button :class="buttonClass" @click="emitAction">
		<slot>
			<img v-if="type === 'edit'" src="./assets/edit.svg" alt="Edit Button" />
			<img
				v-else-if="type === 'delete'"
				src="./assets/delete.svg"
				alt="Delete Button"
			/>
		</slot>
	</button>
</template>

<style module lang="scss">
	@import "./styles/ActionButton.module.scss";
</style>
