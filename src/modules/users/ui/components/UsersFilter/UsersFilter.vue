<script setup lang="ts">
const props = defineProps<{
	filters: { search: string; isBlocked: boolean | undefined };
}>();

const emit = defineEmits<{
	(
		event: 'update:filters',
		value: { search: string; isBlocked: boolean | undefined }
	): void;
}>();

const localFilters = ref({ ...props.filters });

watch(
	localFilters,
	(newFilters) => {
		emit('update:filters', newFilters);
	},
	{ deep: true }
);

const selectedFilter = computed({
	get: () =>
		filterOptions.find((opt) => opt.value === localFilters.value.isBlocked) ||
		filterOptions[0],
	set: (option) => {
		localFilters.value.isBlocked = option.value;
	}
});

const filterOptions = [
	{ text: 'Все пользователи', value: undefined },
	{ text: 'Только заблокированные пользователи', value: true },
	{ text: 'Только активные пользователи', value: false }
];
</script>

<template>
	<div>
		<v-text-field
			v-model="localFilters.search"
			label="Поиск пользователей"
			class="mb-4"
		/>
		<v-combobox
			v-model="selectedFilter"
			label="Фильтр"
			:items="filterOptions"
			item-title="text"
			item-value="value"
		/>
	</div>
</template>
