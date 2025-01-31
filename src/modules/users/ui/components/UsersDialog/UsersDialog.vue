<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');
const action = ref<(() => Promise<void>) | null>(null);

const confirmAction = (msg: string, act: () => Promise<void>) => {
	message.value = msg;
	action.value = act;
	isVisible.value = true;
};

const cancelDialog = () => {
	isVisible.value = false;
	action.value = null;
	message.value = '';
};

const executeDialogAction = async () => {
	if (action.value) {
		try {
			await action.value();
		} catch (error) {
			console.error('Ошибка при выполнении действия:', error);
		} finally {
			cancelDialog();
		}
	}
};

defineExpose({ confirmAction });
</script>

<template>
	<v-dialog v-model="isVisible" max-width="500px">
		<v-card>
			<v-card-title>{{ message }}</v-card-title>
			<v-card-actions>
				<v-btn @click="cancelDialog">Отмена</v-btn>
				<v-btn color="primary" @click="executeDialogAction">Подтвердить</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
