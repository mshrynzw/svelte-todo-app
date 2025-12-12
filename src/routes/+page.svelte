<script lang="ts">
	import TodoForm from '$lib/components/TodoForm.svelte';
	import TodoList from '$lib/components/TodoList.svelte';
	import TodoFilter from '$lib/components/TodoFilter.svelte';
	import { writable } from 'svelte/store';
	import type { FilterType } from '$lib/types';

	let filter = writable<FilterType>('all');
</script>

<div class="bg-white rounded-xl shadow-xl p-6 sm:p-8">
	<TodoForm />
	<TodoFilter {filter} />
	<TodoList {filter} />
</div>
