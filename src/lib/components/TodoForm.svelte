<script lang="ts">
	import { todoStore } from '$lib/stores/todoStore';

	let inputValue = $state('');

	function handleSubmit() {
		if (inputValue.trim()) {
			todoStore.add(inputValue);
			inputValue = '';
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<form
	onsubmit={(e) => {
		e.preventDefault();
		handleSubmit();
	}}
	class="mb-6"
>
	<div class="flex flex-col sm:flex-row gap-2">
		<input
			type="text"
			bind:value={inputValue}
			onkeydown={handleKeydown}
			placeholder="新しいTodoを入力..."
			class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
		/>
		<button
			type="submit"
			class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all font-medium shadow-md hover:shadow-lg active:scale-95"
		>
			追加
		</button>
	</div>
</form>
