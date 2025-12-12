<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { FilterType } from '$lib/types';

	interface Props {
		filter: Writable<FilterType>;
	}

	let { filter }: Props = $props();

	let currentFilter = $state<FilterType>('all');

	// storeの変更を監視
	$effect(() => {
		const unsubscribe = filter.subscribe((value) => {
			currentFilter = value;
		});
		return unsubscribe;
	});

	function setFilter(type: FilterType) {
		filter.set(type);
	}
</script>

<div class="flex flex-wrap gap-2 mb-4">
	<button
		onclick={() => setFilter('all')}
		class="px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 {currentFilter ===
		'all'
			? 'bg-indigo-600 text-white shadow-md'
			: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
	>
		すべて
	</button>
	<button
		onclick={() => setFilter('active')}
		class="px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 {currentFilter ===
		'active'
			? 'bg-indigo-600 text-white shadow-md'
			: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
	>
		未完了
	</button>
	<button
		onclick={() => setFilter('completed')}
		class="px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95 {currentFilter ===
		'completed'
			? 'bg-indigo-600 text-white shadow-md'
			: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
	>
		完了
	</button>
</div>
